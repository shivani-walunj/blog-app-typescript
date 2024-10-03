import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface PostProps {
    post: {
        id: string;
        title: string;
        datetime: string;
        body: string;
    };
}

class Post extends Component<PostProps> {
    render() {
        const { post } = this.props;
        return (
            <article className="post">
                <Link to={`/post/${post.id}`}>
                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                </Link>
                <p className="postBody">
                    {post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)}...`}
                </p>
            </article>
        );
    }
}

export default Post;
