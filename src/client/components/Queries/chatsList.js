import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_CHATS } from "../../graphql/queries/Chats";
import Loading from "../Loading";
import Error from "../Error";

export default class ChatsQuery extends Component {
  render() {
    const { children } = this.props;

    return (
      <Query query={GET_CHATS}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <Loading />;
          if (error) {
            return (
              <Error>
                <p>{error.message}</p>
              </Error>
            );
          }

          const { chats } = data;

          return React.Children.map(children, child => {
            return React.cloneElement(child, { chats });
          });
        }}
      </Query>
    );
  }
}
