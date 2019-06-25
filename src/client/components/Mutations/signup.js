import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNUP } from "../../graphql/mutations/Users";

export default class SignupMutation extends Component {
  render() {
    const { children, changeLoginState } = this.props;
    return (
      <Mutation
        update={(store, { data: { signup } }) => {
          if (signup.token) {
            localStorage.setItem("jwt", signup.token);
            changeLoginState(true);
          }
        }}
        mutation={SIGNUP}
      >
        {(signup, { loading, error }) =>
          React.Children.map(children, function(child) {
            return React.cloneElement(child, { signup, loading, error });
          })
        }
      </Mutation>
    );
  }
}
