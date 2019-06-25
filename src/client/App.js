import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { withApollo } from "react-apollo";
import Feed from "./Feed";
import Chats from "./Chats";
import Bar from "./components/Bar";
import LoginRegisterForm from "./components/LoginRegisterForm";
import CurrentUserQuery from "./components/Queries/currentUser";
import "./components/FontAwesome";
import "../../assets/css/style.css";

class App extends Component {
  state = {
    loggedIn: false
  };

  constructor(props) {
    super(props);
    this.unsubscribe = props.client.onResetStore(() =>
      this.changeLoginState(false)
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  changeLoginState = loggedIn => {
    this.setState({ loggedIn });
  };

  componentWillMount() {
    const token = localStorage.getItem("jwt");
    if (token) {
      this.setState({ loggedIn: true });
    }
  }

  render() {
    return (
      <div className="container">
        <Helmet>
          <title>Graphbook - Feed</title>
          <meta
            name="description"
            content="Newsfeed of all your friends on Graphbook"
          />
        </Helmet>
        {this.state.loggedIn ? (
          <CurrentUserQuery>
            <Bar changeLoginState={this.changeLoginState} />
            <Feed />
            <Chats />
          </CurrentUserQuery>
        ) : (
          <LoginRegisterForm changeLoginState={this.changeLoginState} />
        )}
      </div>
    );
  }
}

export default withApollo(App);
