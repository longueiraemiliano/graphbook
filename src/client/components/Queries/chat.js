import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_CHAT } from "../../graphql/queries/Chats";
import Loading from "../Loading";
import Error from "../Error";

export default class ChatsQuery extends Component {
  render() {
    const { children, chatId } = this.props;

    return (
      <Query query={GET_CHAT} variables={{ chatId }}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) {
            return (
              <Error>
                <p>{error.message}</p>
              </Error>
            );
          }

          const { chat } = data;

          return React.Children.map(children, child => {
            return React.cloneElement(child, { chat });
          });
        }}
      </Query>
    );
  }
}
