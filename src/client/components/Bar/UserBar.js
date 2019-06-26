import React, { Component } from "react";
import UploadAvatarMutation from "../mutations/uploadAvatar";
import AvatarUpload from "../AvatarModal";

export default class UserBar extends Component {
  state = {
    isOpen: false
  };

  showModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { currentUser } = this.props;

    if (!currentUser) return null;

    return (
      <div className="user">
        <img src={currentUser.avatar} onClick={this.showModal} />
        <UploadAvatarMutation>
          <AvatarUpload isOpen={this.state.isOpen} showModal={this.showModal} />
        </UploadAvatarMutation>
        <span>{currentUser.username}</span>
      </div>
    );
  }
}
