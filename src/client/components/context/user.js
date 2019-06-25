import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import { GET_CURRENT_USER } from "../../graphql/queries/Users";

export class UserConsumer extends Component {
  render() {
    const { children } = this.props;
    return (
      <ApolloConsumer>
        {client => {
          const { currentUser } = client.readQuery({ query: GET_CURRENT_USER });

          return React.Children.map(children, function(child) {
            return React.cloneElement(child, { currentUser });
          });
        }}
      </ApolloConsumer>
    );
  }
}
