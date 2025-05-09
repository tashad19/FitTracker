import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  // static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      exercises: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://fittracker-1k9g.onrender.com/exercises/")
      .then((res) => {
        this.setState({ exercises: res.data });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  }

  deleteExercise = (id) => {
    axios
      .delete("https://fittracker-1k9g.onrender.com/exercises/" + id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log("Error: " + err));

    this.setState({
      exercises: this.state.exercises.filter((ex) => ex._id !== id),
    });
  };

  exerciseList() {
    return this.state.exercises.map(currentExercise => {
      return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              {/* <th>Username</th> */}
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{ this.exerciseList() }</tbody>
        </table>
      </div>
    );
  }
}
