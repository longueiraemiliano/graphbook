import React, { Component } from "react";
import { Mutation } from "react-apollo";
import UPDATE_POST from "../../graphql/mutations/Posts/UPDATE_POST";
import GET_POSTS from "../../graphql/queries/Posts/GET_POSTS";

export default class UpdatePostMutation extends Component {
  state = {
    postContent: this.props.post.text
  };

  changePostContent = value => {
    this.setState({ postContent: value });
  };

  render() {
    const self = this;
    const { children } = this.props;
    const { postContent } = this.state;

    const postId = this.props.post.id;
    const variables = { page: 0, limit: 10 };

    return (
      <Mutation
        update={(store, { data: { updatePost } }) => {
          var query = {
            query: GET_POSTS
          };

          if (typeof variables !== typeof undefined) {
            query.variables = variables;
          }

          const data = store.readQuery(query);
          for (var i = 0; i < data.postsFeed.posts.length; i++) {
            if (data.postsFeed.posts[i].id === postId) {
              data.postsFeed.posts[i].text = updatePost.text;
              break;
            }
          }

          store.writeQuery({ ...query, data });
        }}
        optimisticResponse={{
          __typename: "mutation",
          updatePost: {
            __typename: "Post",
            text: postContent
          }
        }}
        mutation={UPDATE_POST}
      >
        {updatePost =>
          React.Children.map(children, function(child) {
            return React.cloneElement(child, {
              updatePost,
              postContent,
              postId,
              changePostContent: self.changePostContent
            });
          })
        }
      </Mutation>
    );
  }
}
