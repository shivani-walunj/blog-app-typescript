import React, { Component, ChangeEvent, FormEvent } from "react";
import { Link, useParams, useNavigate, NavigateFunction } from "react-router-dom";

interface Post {
    id: number;
    title: string;
    body: string;
}

interface EditPostProps {
    posts: Post[];
    handleEdit: (id: number) => void;
    editBody: string;
    setEditBody: (body: string) => void;
    editTitle: string;
    setEditTitle: (title: string) => void;
    params: { id: string };
    navigate: NavigateFunction;
}

class EditPost extends Component<EditPostProps> {
    componentDidMount() {
        this.setPostData();
    }

    componentDidUpdate(prevProps: EditPostProps) {
        if (prevProps.posts !== this.props.posts) {
            this.setPostData();
        }
    }

    setPostData() {
        const { posts, params, setEditTitle, setEditBody } = this.props;
        const post = posts.find(post => post.id.toString() === params.id);
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }

    handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.setEditTitle(e.target.value);
    }

    handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        this.props.setEditBody(e.target.value);
    }

    handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { handleEdit, params } = this.props;
        handleEdit(parseInt(params.id));
    }

    render() {
        const { editTitle, editBody } = this.props;
        const post = this.props.posts.find(post => post.id.toString() === this.props.params.id);

        return (
            <main className="NewPost">
                {editTitle ? (
                    <>
                        <h2>Edit Post</h2>
                        <form className="newPostForm" onSubmit={this.handleSubmit}>
                            <label htmlFor="postTitle">Title:</label>
                            <input
                                id="postTitle"
                                type="text"
                                required
                                value={editTitle}
                                onChange={this.handleTitleChange}
                            />
                            <label htmlFor="postBody">Post:</label>
                            <textarea
                                id="postBody"
                                required
                                value={editBody}
                                onChange={this.handleBodyChange}
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to="/">Visit Our Homepage</Link>
                        </p>
                    </>
                )}
            </main>
        );
    }
}

const EditPostWrapper = (props: Omit<EditPostProps, 'params' | 'navigate'>) => {
    const params = useParams<{ id: string }>();
    const navigate = useNavigate();
    //@ts-ignore
    return <EditPost {...props} params={params} navigate={navigate} />;
};

export default EditPostWrapper;
