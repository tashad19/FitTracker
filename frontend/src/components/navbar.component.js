import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./user-context";

export default class Navbar extends Component {
  static contextType = UserContext;

  handleLogout = () => {
    const { setUser } = this.context;
    setUser(null);
  };

  render() {
    const { user } = this.context;

    return (
      <div className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand mx-3">
            FitTracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/exercises" className="nav-link mx-3 active">
                  Exercises
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link mx-3">
                  Create Exercise Log
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user ? (
                <li className="nav-item">
                  <Link to="/" className="nav-link mx-3" onClick={this.handleLogout}>
                    Log Out
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link mx-3">
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link mx-3">
                      Log In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
