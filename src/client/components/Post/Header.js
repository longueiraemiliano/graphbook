import React from "react";
import Dropdown from "../helpers/dropdown";
import DeletePostMutation from "../mutations/deletePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteButton = ({ deletePost, postId }) => (
  <button
    onClick={() => {
      deletePost({ variables: { postId } });
    }}
  >
    Delete
  </button>
);

export default ({ post, changeState }) => (
  <div className="header">
    <img src={post.user.avatar} />
    <div>
      <h2>{post.user.username}</h2>
    </div>
    <Dropdown trigger={<FontAwesomeIcon icon="angle-down" />}>
      <button onClick={changeState}>Edit</button>
      <DeletePostMutation post={post}>
        <DeleteButton />
      </DeletePostMutation>
    </Dropdown>
  </div>
);
