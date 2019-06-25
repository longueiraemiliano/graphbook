import React, { Component } from "react";
import { Mutation } from "react-apollo";
import DELETE_POST from "../../graphql/mutations/Posts/DELETE_POST";
import GET_POSTS from "../../graphql/queries/Posts/GET_POSTS";

export default class DeletePostMutation extends Component {
  render() {
    const { children } = this.props;
    const postId = this.props.post.id;
    const variables = { page: 0, limit: 10 };

    return (
      <Mutation
        update={(
          store,
          {
            data: {
              deletePost: { success }
            }
          }
        ) => {
          if (success) {
            var query = {
              query: GET_POSTS
            };

            if (typeof variables !== typeof undefined) {
              query.variables = variables;
            }

            const data = store.readQuery(query);

            for (var i = 0; i < data.postsFeed.posts.length; i++) {
              if (data.postsFeed.posts[i].id === postId) {
                break;
              }
            }

            data.postsFeed.posts.splice(i, 1);

            store.writeQuery({ ...query, data });
          }
        }}
        mutation={DELETE_POST}
      >
        {deletePost =>
          React.Children.map(children, function(child) {
            return React.cloneElement(child, { deletePost, postId });
          })
        }
      </Mutation>
    );
  }
}
