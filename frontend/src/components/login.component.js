import React, { Component, useContext } from "react";
import axios from "axios";
import { UserContext } from "./user-context";

export default class Login extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
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
      .post("https://fittracker-1k9g.onrender.com/login/", user)
      .then((res) => {
        console.log(res);
        if (res.data !== "incorrect" && res.data !== "no record existed") {
          setUser(res.data.username); // Update the context with the logged-in user's data

          this.setState({
            isLoggedIn: true,
          })

          // this.props.history.push("/"); // Navigate to the home page without reloading
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
    const { user, setUser } = this.context;

    return (
      <div>
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
                disabled={this.state.isLoggedIn}
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
                disabled={this.state.isLoggedIn}
              />
            </div>
            <div className="form-group">
              <input type="submit" value="Login" className="btn btn-primary" disabled={this.stateisLoggedIn} />
            </div>
          </form>
          {this.state.isLoggedIn && (
          <div style={{ color: "green", marginTop: "10px" }}>
            Successfully logged in
          </div>
        )}
        </div>
      </div>
    );
  }
}
