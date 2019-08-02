import React, { Component } from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import { GET_CHAT } from "../../graphql/queries/Chats";

const MESSAGES_SUBSCRIPTION = gql`
  subscription onMessageAdded {
    messageAdded {
      id
      text
      chat {
        id
      }
      user {
        id
        __typename
      }
      __typename
    }
  }
`;

class ChatList extends Component {
  componentDidMount() {
    this.subscribeToNewMessages();
  }

  subscribeToNewMessages = () => {
    const self = this;
    const { user } = this.props;
    this.props.subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data || !prev.chats.length) return prev;

        var index = -1;
        for (var i = 0; i < prev.chats.length; i++) {
          if (prev.chats[i].id == subscriptionData.data.messageAdded.chat.id) {
            index = i;
            break;
          }
        }

        if (index === -1) return prev;

        const newValue = Object.assign({}, prev.chats[i], {
          lastMessage: {
            text: subscriptionData.data.messageAdded.text,
            __typename: subscriptionData.data.messageAdded.__typename
          }
        });

        var newList = { chats: [...prev.chats] };
        newList.chats[i] = newValue;

        try {
          const data = self.props.client.store.cache.readQuery({
            query: GET_CHAT,
            variables: { chatId: subscriptionData.data.messageAdded.chat.id }
          });
          if (user.id !== subscriptionData.data.messageAdded.user.id) {
            data.chat.messages.push(subscriptionData.data.messageAdded);
            self.props.client.store.cache.writeQuery({
              query: GET_CHAT,
              variables: { chatId: subscriptionData.data.messageAdded.chat.id },
              data
            });
          }
        } catch (e) {}

        return newList;
      }
    });
  };

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
    const { chats, openChat, currentUser } = this.props;
    return chats.map((chat, i) => {
      const chatingTo = chat.users.find(user => user.id !== currentUser.id);

      return (
        <div
          key={"chat" + chat.id}
          className="chat"
          onClick={() => openChat(chat.id)}
        >
          <div className="header">
            <img
              src={
                chat.users.length > 2 ? "/public/group.png" : chatingTo.avatar
              }
            />
            <div>
              <h2>{this.shorten(chatingTo.username)}</h2>
              <span>{this.shorten(chat.lastMessage.text)}</span>
            </div>
          </div>
        </div>
      );
    });
  }
}

export default withApollo(ChatList);
