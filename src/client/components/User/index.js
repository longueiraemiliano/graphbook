import React, { Component } from "react";
import PostsQuery from "../Queries/postFeed";
import FeedList from "../Post/FeedList";
import UserHeader from "./header";
import UserQuery from "../Queries/userQuery";

export default class UserProfile extends Component {
  render() {
    const query_variables = {
      page: 0,
      limit: 10,
      username: this.props.username
    };
    return (
      <div className="user">
        <div className="inner">
          <UserQuery variables={{ username: this.props.username }}>
            <UserHeader />
          </UserQuery>
        </div>
        <div className="container">
          <PostsQuery variables={query_variables}>
            <FeedList />
          </PostsQuery>
        </div>
      </div>
    );
  }
}
