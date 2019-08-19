import React, { Component } from "react";
import PostHeader from "./Header";
import PostContent from "./Content";
import PostForm from "./Form";
import UpdatePostMutation from "../Mutations/updatePost";

export default class Post extends Component {
  state = {
    editing: false
  };

  changeState = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  render() {
    const { post } = this.props;
    const { editing } = this.state;

    return (
      <div className={"post " + (post.id < 0 ? "optimistic" : "")}>
        <PostHeader post={post} changeState={this.changeState} />
        {!editing && <PostContent post={post} />}
        {editing && (
          <UpdatePostMutation post={post}>
            <PostForm changeState={this.changeState} />
          </UpdatePostMutation>
        )}
      </div>
    );
  }
}
