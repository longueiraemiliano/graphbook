import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_USER } from "../../graphql/queries/Users";
import Loading from "../Loading";
import Error from "../Error";

export default class UserQuery extends Component {
  getVariables = () => {
    const { variables } = this.props;
    var query_variables = {};
    if (typeof variables.username !== typeof undefined) {
      query_variables.username = variables.username;
    }

    return query_variables;
  };

  render() {
    const { children } = this.props;
    const variables = this.getVariables();

    return (
      <Query query={GET_USER} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) {
            return (
              <Error>
                <p>{error.message}</p>
              </Error>
            );
          }

          const { user } = data;

          return React.Children.map(children, child => {
            return React.cloneElement(child, { user });
          });
        }}
      </Query>
    );
  }
}
