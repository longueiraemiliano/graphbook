import React, { Component } from "react";
import { Subscription } from "react-apollo";
import { MESSAGES_SUBSCRIPTION } from "../../graphql/subscriptions/Chats";

export default class MessageAddedSubscription extends Component {
  render() {
    const { children } = this.props;
    return (
      <Subscription subscription={MESSAGES_SUBSCRIPTION}>
        {({ data }) => {
          return React.Children.map(children, function(child) {
            return React.cloneElement(child, { data });
          });
        }}
      </Subscription>
    );
  }
}
