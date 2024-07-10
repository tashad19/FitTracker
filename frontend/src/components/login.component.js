import React, { Component } from "react";
import axios from "axios";
import { UserContext } from "../App";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onSubmit = (e, setUser) => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(user);

    axios
      .post("http://localhost:4000/login/", user)
      .then((res) => {
        console.log(res);
        if (res.data === "Success") {
          setUser(res.data); // Update the context with the logged-in user's data

          window.location = "/exercises";
        } else {
          alert("Invalid Credentials");
          this.setState({
            email: "",
            password: "",
          });
        }
      })
      .catch((err) => console.log("Error: " + err));

    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    return (
      <div>
        <UserContext.Consumer>
          {([user, setUser]) => (
            <div>
              <h3>Login</h3>
              <form onSubmit={(e) => this.onSubmit(e, setUser)}>
                <div className="form-group">
                  <label>Email: </label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />
                </div>
                <div className="form-group">
                  <label>Password: </label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          )}
        </UserContext.Consumer>
      </div>
    );
  }
}
