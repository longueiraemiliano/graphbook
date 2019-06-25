import React, { Component } from "react";
import AddMessageMutation from "../Mutations/addChatMessage";
import ChatInput from "./ChatInput";

export default class ChatWindow extends Component {
  render() {
    const self = this;
    const { chat, closeChat } = this.props;

    return (
      <div className="chatWindow">
        <div className="header">
          <span>{chat.users[1].username}</span>
          <button onClick={closeChat} className="close">
            X
          </button>
        </div>
        <div className="messages">
          {chat.messages.map((message, j) => (
            <div
              key={"message" + message.id}
              className={"message " + (message.user.id > 1 ? "left" : "right")}
            >
              {message.text}
            </div>
          ))}
        </div>
        <AddMessageMutation chat={chat}>
          <ChatInput chat={chat} />
        </AddMessageMutation>
      </div>
    );
  }
}
