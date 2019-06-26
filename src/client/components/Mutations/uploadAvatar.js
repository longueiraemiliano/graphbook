import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { UPLOAD_AVATAR } from "../../graphql/mutations/Users";
import { GET_CURRENT_USER } from "../../graphql/queries/Users";

export default class UploadAvatarMutation extends Component {
  render() {
    const { children } = this.props;
    return (
      <Mutation
        update={(store, { data: { uploadAvatar } }) => {
          var query = {
            query: GET_CURRENT_USER
          };
          const data = store.readQuery(query);
          data.currentUser.avatar = uploadAvatar.url;
          store.writeQuery({ ...query, data });
        }}
        mutation={UPLOAD_AVATAR}
      >
        {uploadAvatar =>
          React.Children.map(children, function(child) {
            return React.cloneElement(child, { uploadAvatar });
          })
        }
      </Mutation>
    );
  }
}
