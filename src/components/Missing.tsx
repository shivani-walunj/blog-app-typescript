import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Missing extends Component<{}> {
    render() {
        return (
            <main className="Missing">
                <h2>Page Not Found</h2>
                <p>Well, that's disappointing.</p>
                <p>
                    <Link to="/">Visit Our Homepage</Link>
                </p>
            </main>
        );
    }
}

export default Missing;
