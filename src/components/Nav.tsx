import React, { Component, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';

interface NavProps {
    search: string;
    setSearch: (value: string) => void;
}

class Nav extends Component<NavProps> {
    handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.setSearch(e.target.value);
    };

    handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    render() {
        return (
            <nav className="Nav">
                <form className="searchForm" onSubmit={this.handleSubmit} data-testId='form'>
                    <label htmlFor="search">Search Posts</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search Posts"
                        value={this.props.search}
                        onChange={this.handleSearchChange}
                    />
                </form>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/post">Post</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
        );
    }
}

export default Nav;
