import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class EditExercises extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
      successMessage: ""
    };
  }

  componentDidMount = () => {
    const arr = window.location.href.split("/");
    axios.get("https://fittracker-1k9g.onrender.com/exercises/" + arr[arr.length - 1])
      .then(res => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date)
        });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });

    axios.get("https://fittracker-1k9g.onrender.com/signup/")
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map(user => user.username),
          });
        }
      });
  };

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  onChangeDuration = (e) => {
    this.setState({
      duration: e.target.value,
    });
  };
  onChangeDate = (date) => {
    this.setState({
      date: date,
    });
  };

  onSubmit = (e) => {
    const arr = window.location.href.split("/");
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(exercise);

    axios.post("https://fittracker-1k9g.onrender.com/exercises/update/" + arr[arr.length - 1], exercise)
      .then(res => {
        console.log(res.data);
        this.setState({
          successMessage: "Exercise Log updated successfully"
        });
      })
      .catch(err => console.log("Error: " + err));

    // Clear the form
    this.setState({
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
    });
  };

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
        {this.state.successMessage && (
          <div className="mt-3">
            <p className="text-success">{this.state.successMessage}</p>
          </div>
        )}
      </div>
    );
  }
}
