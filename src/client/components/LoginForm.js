import React, { Component } from "react";
import Error from "./Error";

export default class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  login = event => {
    event.preventDefault();
    this.props.login({
      variables: { email: this.state.email, password: this.state.password }
    });
  };

  onChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { error } = this.props;
    return (
      <div className="login">
        <form onSubmit={this.login}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <input type="submit" value="Login" />
        </form>
        {error && (
          <Error>
            <p>There was an error logging in!</p>
          </Error>
        )}
      </div>
    );
  }
}
