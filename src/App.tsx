import React, { Component, FormEvent } from "react";
import { Route, Routes, useNavigate, NavigateFunction } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import Header from "./components/Header.tsx";
import Nav from "./components/Nav.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./components/Home.tsx";
import NewPost from "./components/NewPost.tsx";
import PostPage from "./components/PostPage.tsx";
import EditPost from "./components/EditPost.tsx";
import About from "./components/About.tsx";
import Missing from "./components/Missing.tsx";

interface Post {
  id: number;
  title: string;
  datetime: string;
  body: string;
}

interface AppState {
  posts: Post[];
  search: string;
  searchResults: Post[];
  postTitle: string;
  postBody: string;
  editTitle: string;
  editBody: string;
}

interface AppProps {
  navigate: NavigateFunction;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      posts: [],
      search: "",
      searchResults: [],
      postTitle: "",
      postBody: "",
      editTitle: "",
      editBody: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {
    if (prevState.posts !== this.state.posts || prevState.search !== this.state.search) {
      this.filterResults();
    }
  }

  async fetchProducts() {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      const transformedPosts = response.data.products.map((product: any) => ({
        id: product.id,
        title: product.title,
        datetime: format(new Date(), "MMMM dd, yyyy pp"),
        body: product.description,
      }));
      this.setState({ posts: transformedPosts });
    } catch (err) {
      //@ts-ignore
      console.error(`Error: ${err.message}`);
    }
  }

  filterResults() {
    const filteredResults = this.state.posts.filter(
      (post) =>
        post.body.toLowerCase().includes(this.state.search.toLowerCase()) ||
        post.title.toLowerCase().includes(this.state.search.toLowerCase())
    );
    this.setState({ searchResults: filteredResults.reverse() });
  }

  handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = this.state.posts.length ? this.state.posts[this.state.posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: this.state.postTitle, datetime, body: this.state.postBody };

    const allPosts = [...this.state.posts, newPost];
    this.setState({ posts: allPosts, postTitle: "", postBody: "" });
    this.props.navigate("/");
  }

  handleEdit(id: number) {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: this.state.editTitle, datetime, body: this.state.editBody };

    const updatedPosts = this.state.posts.map((post) =>
      post.id === id ? updatedPost : post
    );
    this.setState({ posts: updatedPosts, editTitle: "", editBody: "" });
    this.props.navigate("/");
  }

  async handleDelete(id: number) {
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`);
      const postsList = this.state.posts.filter((post) => post.id !== id);
      this.setState({ posts: postsList });
      this.props.navigate("/");
    } catch (err) {
      //@ts-ignore
      console.error(`Error: ${err.message}`);
    }
  }

  render() {
    return (
      <div className="App">
        <Header title="Blogs" />
        <Nav search={this.state.search} setSearch={(search) => this.setState({ search })} />
        <Routes>
          <Route path="/" element={<Home posts={this.state.searchResults} />} />
          <Route
            path="/post"
            element={
              <NewPost
                handleSubmit={this.handleSubmit}
                postTitle={this.state.postTitle}
                setPostTitle={(postTitle) => this.setState({ postTitle })}
                postBody={this.state.postBody}
                setPostBody={(postBody) => this.setState({ postBody })}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <EditPost
                posts={this.state.posts}
                handleEdit={this.handleEdit}
                editTitle={this.state.editTitle}
                setEditTitle={(editTitle) => this.setState({ editTitle })}
                editBody={this.state.editBody}
                setEditBody={(editBody) => this.setState({ editBody })}
              />
            }
          />
          <Route
            path="/post/:id"
            element={<PostPage posts={this.state.posts} handleDelete={this.handleDelete} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

const AppWithNavigate = (props: Omit<AppProps, 'navigate'>) => {
  const navigate = useNavigate();
  return <App {...props} navigate={navigate} />;
};

export default AppWithNavigate;
