require("dotenv").config();

const express = require("express"); //get express pakage
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

//express app
const app = express(); //start express app

//middleware
app.use(express.json()); //if there is some data need to send to the server then passes attaches it //front end ko data lai json ko format ma lena

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
