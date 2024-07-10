import React, { Component } from "react";
import { UserContext } from "../App";

export default class Home extends Component {
  render() {
    return (
      <div className="text-center">
        <h1 className="m-5">FitTracker</h1>
        <h3 className="m-5">Your personalized fitness tracker.</h3>
        <UserContext.Consumer>
          {([user, setUser]) => {
            if (user) {
              return <h2>Hello, {user.username}!</h2>;
            } else {
              return <h5>Please log in.</h5>;
            }
          }}
        </UserContext.Consumer>
      </div>
    );
  }
}
