import React, { Component } from "react";
import SearchBar from "./SearchBar";
import UserBar from "./UserBar";
import { UserConsumer } from "../context/user";
import Logout from "./Logout";
import Home from "./Home";
import LogoutMutation from "../Mutations/logout";

export default class Bar extends Component {
  render() {
    return (
      <div className="topbar">
        <div className="inner">
          <SearchBar />
          <UserConsumer>
            <UserBar />
          </UserConsumer>
        </div>
        <div className="buttons">
          <Home />
          <LogoutMutation>
            <Logout changeLoginState={this.props.changeLoginState} />
          </LogoutMutation>
        </div>
      </div>
    );
  }
}
