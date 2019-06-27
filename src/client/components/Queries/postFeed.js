import React, { Component } from "react";
import { Query } from "react-apollo";
import GET_POSTS from "../../graphql/queries/Posts/GET_POSTS";
import Loading from "../Loading";
import Error from "../Error";

export default class PostsFeedQuery extends Component {
  getVariables() {
    const { variables } = this.props;
    var query_variables = {
      page: 0,
      limit: 10
    };

    if (typeof variables !== typeof undefined) {
      if (typeof variables.page !== typeof undefined) {
        query_variables.page = variables.page;
      }
      if (typeof variables.limit !== typeof undefined) {
        query_variables.limit = variables.limit;
      }
      if (typeof variables.username !== typeof undefined) {
        query_variables.username = variables.username;
      }
    }

    return query_variables;
  }

  render() {
    const { children } = this.props;
    const variables = this.getVariables();

    return (
      <Query query={GET_POSTS} variables={variables}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) return <Loading />;
          if (error)
            return (
              <Error>
                <p>{error.message}</p>
              </Error>
            );

          const { postsFeed } = data;
          const { posts } = postsFeed;

          return React.Children.map(children, child => {
            return React.cloneElement(child, { posts, fetchMore });
          });
        }}
      </Query>
    );
  }
}
