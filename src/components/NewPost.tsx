import React, { Component, ChangeEvent, FormEvent } from 'react';

interface NewPostProps {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    postTitle: string;
    setPostTitle: (title: string) => void;
    postBody: string;
    setPostBody: (body: string) => void;
}

class NewPost extends Component<NewPostProps> {
    constructor(props: NewPostProps) {
        super(props);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
    }

    handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        this.props.setPostTitle(e.target.value);
    }

    handleBodyChange(e: ChangeEvent<HTMLTextAreaElement>) {
        this.props.setPostBody(e.target.value);
    }

    render() {
        const { handleSubmit, postTitle, postBody } = this.props;
        return (
            <main className="NewPost">
                <h2>New Post</h2>
                <form className="newPostForm" onSubmit={handleSubmit}>
                    <label htmlFor="postTitle">Title:</label>
                    <input
                        id="postTitle"
                        type="text"
                        required
                        value={postTitle}
                        onChange={this.handleTitleChange}
                    />
                    <label htmlFor="postBody">Post:</label>
                    <textarea
                        id="postBody"
                        required
                        value={postBody}
                        onChange={this.handleBodyChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            </main>
        );
    }
}

export default NewPost;
