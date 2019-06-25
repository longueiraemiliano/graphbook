import React, { Component } from "react";
import LoginMutation from "./Mutations/login";
import RegisterMutation from "./Mutations/signup";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default class LoginRegisterForm extends Component {
  state = {
    showLogin: true
  };

  render() {
    const { changeLoginState } = this.props;
    const { showLogin } = this.state;

    return (
      <div className="authModal">
        {showLogin && (
          <div>
            <LoginMutation changeLoginState={changeLoginState}>
              <LoginForm />
            </LoginMutation>
            <a onClick={() => this.setState({ showLogin: false })}>
              Want to sign up? Click here
            </a>
          </div>
        )}
        {!showLogin && (
          <div>
            <RegisterMutation changeLoginState={changeLoginState}>
              <RegisterForm />
            </RegisterMutation>
            <a onClick={() => this.setState({ showLogin: true })}>
              Want to login? Click here
            </a>
          </div>
        )}
      </div>
    );
  }
}
