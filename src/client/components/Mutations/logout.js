import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { LOGOUT } from "../../graphql/mutations/Users";

export default class LogoutMutation extends Component {
  render() {
    const { children } = this.props;
    return (
      <Mutation mutation={LOGOUT}>
        {(logout, { loading, error }) =>
          React.Children.map(children, function(child) {
            return React.cloneElement(child, { logout, loading, error });
          })
        }
      </Mutation>
    );
  }
}
