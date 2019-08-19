import React, { Component } from "react";
import UserProfile from "./components/User";
import Chats from "./Chats";
import Bar from "./components/Bar";
import CurrentUserQuery from "./components/Queries/currentUser";

export default class User extends Component {
  render() {
    return (
      <CurrentUserQuery>
        <Bar changeLoginState={this.props.changeLoginState} />
        <UserProfile username={this.props.match.params.username} />
        <Chats />
      </CurrentUserQuery>
    );
  }
}
