import React, { Component } from "react";

class ChatList extends Component {
  usernamesToString(users) {
    const userList = users.slice(1);
    var usernamesString = "";

    for (var i = 0; i < userList.length; i++) {
      usernamesString += userList[i].username;
      if (i - 1 === userList.length) {
        usernamesString += ", ";
      }
    }

    return usernamesString;
  }

  shorten(text) {
    if (text.length > 12) {
      return text.substring(0, text.length - 9) + "...";
    }

    return text;
  }

  render() {
    const { chats, openChat } = this.props;

    return chats.map((chat, i) => (
      <div
        key={"chat" + chat.id}
        className="chat"
        onClick={() => openChat(chat.id)}
      >
        <div className="header">
          <img
            src={
              chat.users.length > 2 ? "/public/group.png" : chat.users[1].avatar
            }
          />
          <div>
            <h2>{this.shorten(this.usernamesToString(chat.users))}</h2>
            <span>{this.shorten(chat.lastMessage.text)}</span>
          </div>
        </div>
      </div>
    ));
  }
}

export default ChatList;
