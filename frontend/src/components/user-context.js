// UserContext.js
import React, { createContext, Component } from "react";

export const UserContext = createContext();

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  setUser = (user) => {
    this.setState({ user });
  };

  render() {
    return (
      <UserContext.Provider value={{ ...this.state, setUser: this.setUser }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
