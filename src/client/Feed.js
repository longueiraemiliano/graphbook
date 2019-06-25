import React, { Component } from "react";
import AddPostMutation from "./components/Mutations/addPost";
import FeedList from "./components/Post/FeedList";
import PostForm from "./components/Post/Form";
import PostsFeedQuery from "./components/Queries/postFeed";
import "../../assets/css/style.css";

export default class App extends Component {
  state = {
    postContent: "",
    hasMore: true,
    page: 0
  };

  render() {
    const query_variables = { page: 0, limit: 10 };

    return (
      <div className="container">
        <AddPostMutation variables={query_variables}>
          <PostForm />
        </AddPostMutation>
        <PostsFeedQuery variables={query_variables}>
          <FeedList />
        </PostsFeedQuery>
      </div>
    );
  }
}
