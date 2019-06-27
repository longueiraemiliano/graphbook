import React, { Component } from "react";
import ChatsLists from "./components/Chat/ChatsList";
import ChatWindow from "./components/Chat/ChatWindow";
import ChatsQuery from "./components/Queries/chatsList";
import ChatQuery from "./components/Queries/chat";

export default class Chats extends Component {
  state = {
    openChats: []
  };

  openChat = id => {
    var openChats = this.state.openChats.slice();

    if (openChats.indexOf(id) === -1) {
      if (openChats.length > 2) {
        openChats = openChats.slice(1);
      }

      openChats.push(id);
    }

    this.setState({ openChats });
  };

  closeChat = id => {
    var openChats = this.state.openChats.slice();

    const index = openChats.indexOf(id);
    openChats.splice(index, 1);
    this.setState({ openChats });
  };

  render() {
    const self = this;
    const { openChats } = this.state;
    const { currentUser } = this.props;
    return (
      <div className="wrapper">
        <div className="chats">
          <ChatsQuery>
            <ChatsLists currentUser={currentUser} openChat={self.openChat} />
          </ChatsQuery>
        </div>
        <div className="openChats">
          {openChats.map((chatId, i) => (
            <ChatQuery key={"chatWindow" + chatId} chatId={chatId}>
              <ChatWindow
                currentUser={currentUser}
                closeChat={self.closeChat}
              />
            </ChatQuery>
          ))}
        </div>
      </div>
    );
  }
}
