import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Popper from "popper.js";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" exact Component={ExercisesList} />
          <Route path="/edit/:id" exact Component={EditExercise} />
          <Route path="/create" exact Component={CreateExercise} />
          <Route path="/user" exact Component={CreateUser} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
