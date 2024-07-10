const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const exercisesRouter = require("./routes/exercises");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json()); 

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use("/exercises", exercisesRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})