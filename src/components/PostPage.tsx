import React, { Component } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  datetime: string;
  body: string;
}

interface PostPageProps {
  posts: Post[];
  handleDelete: (id: string) => void;
  params: { id: string };
  navigate: (path: string) => void;
}

class PostPage extends Component<PostPageProps> {
  render() {
    const { posts, handleDelete, params } = this.props;
    const { id } = params;
    const post = posts.find((post) => post.id.toString() === id);

    return (
      <main className="PostPage">
        <article className="post">
          {post && (
            <>
              <h2>{post.title}</h2>
              <p className="postDate">{post.datetime}</p>
              <p className="postBody">{post.body}</p>
              <button
                className="deleteButton"
                onClick={() => handleDelete(post.id)}
              >
                Delete Post
              </button>
              <button className="editButton">
                <Link to={`/edit/${post.id}`} className="editLink">Edit Post</Link>
              </button>
            </>
          )}
          {!post && <p>Post not found</p>}
        </article>
      </main>
    );
  }
}

const PostPageWrapper = (props: any) => {
  const params = useParams();
  const navigate = useNavigate();
  return <PostPage {...props} params={params} navigate={navigate} />;
};

export default PostPageWrapper;
