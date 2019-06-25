import React, { Component } from "react";

export default class UserBar extends Component {
  render() {
    const { currentUser } = this.props;

    if (!currentUser) return null;

    return (
      <div className="user">
        <img src={currentUser.avatar} />
        <span>{currentUser.username}</span>
      </div>
    );
  }
}
