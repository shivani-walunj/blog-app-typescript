import React, { Component } from 'react';
import Post from './Post';

export interface PostType {
        id: string;
        title: string;
        datetime: string;
        body: string;
}

export interface FeedProps {
    posts: PostType[];
}

class Feed extends Component<FeedProps> {
    render() {
        const { posts } = this.props;
        return (
            <>
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </>
        );
    }
}

export default Feed;
