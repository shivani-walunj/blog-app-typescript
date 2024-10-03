import React, { Component } from 'react';
import Feed from "./Feed.tsx";

interface HomeProps {
    posts: {
        id: number;
        title: string;
        body: string;
        datetime: string;
    }[];
}

class Home extends Component<HomeProps> {
    render() {
        const { posts } = this.props;
        return (
            <main className="Home">
                {posts.length ? (
                    //@ts-ignore
                    <Feed posts={posts} />
                ) : (
                    <p style={{ marginTop: "2rem" }}>
                        No posts to display.
                    </p>
                )}
            </main>
        );
    }
}

export default Home;
