import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Popper from "popper.js";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import SignUp from "./components/signup.component";
import Login from "./components/login.component";
import Home from "./components/home.component";
import { UserProvider } from "./components/user-context";

export const UserContext = createContext();

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <div className="container">
          <Navbar />
          <Routes>
          <Route path="/" exact Component={Home} />
            <Route path="/exercises" exact Component={ExercisesList} />
            <Route path="/edit/:id" exact Component={EditExercise} />
            <Route path="/create" exact Component={CreateExercise} />
            <Route path="/signup" exact Component={SignUp} />
            <Route path="/login" exact Component={Login} />
          </Routes>
        </div>
        </UserProvider>
    </BrowserRouter>
  );
}

export default App;
