import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { ADD_MESSAGE } from "../../graphql/mutations/Chats";
import { GET_CHAT } from "../../graphql/queries/Chats";

export default class AddMessageMutation extends Component {
  render() {
    const { children, chat } = this.props;
    return (
      <Mutation
        update={(store, { data: { addMessage } }) => {
          const data = store.readQuery({
            query: GET_CHAT,
            variables: { chatId: chat.id }
          });
          data.chat.messages.push(addMessage);
          store.writeQuery({
            query: GET_CHAT,
            variables: { chatId: chat.id },
            data
          });
        }}
        mutation={ADD_MESSAGE}
      >
        {addMessage =>
          React.Children.map(children, function(child) {
            return React.cloneElement(child, { addMessage });
          })
        }
      </Mutation>
    );
  }
}
