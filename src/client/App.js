import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { withApollo } from "react-apollo";
import Routing from "./Routing";
import "./components/FontAwesome";
import "../../assets/css/style.css";
import "@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css";

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
        <Routing
          loggedIn={this.state.loggedIn}
          changeLoginState={this.changeLoginState}
        />
      </div>
    );
  }
}

export default withApollo(App);
