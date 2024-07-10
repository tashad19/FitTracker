import React, { Component } from "react";
import { UserContext } from "./user-context";

export default class Home extends Component {
    static contextType = UserContext;

  render() {
    const { user } = this.context;

    return (
      <div className="text-center">
        <h1 className="m-5">FitTracker</h1>
        <h3 className="m-5">Your personalized fitness tracker.</h3>
  
        {user ? <h2 className="text-secondary">Hello, {user}!</h2> : <h2 className="text-secondary">Please log in.</h2>}
      </div>
    );
  }
}
