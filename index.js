const express = require("express");
const mongoose = require("mongoose");
const server = express();
const port = 2020;
const {
  createStudent,
  basePath,
  notFound,
  fetcAllStudent,
  fetchById,
  updateStudent,
  deleteStudent,
} = require("./Controllers/Student.controller");

const {
  createTeacher,
  UpdateTeacherById,
  fetchTeacherById,
  deleteTeacher,
} = require("./Controllers/teacher.controller");

server.use(express.json());

//middleware to read formdata/urlencode
server.use(express.urlencoded({ extended: true }));

server.post("/student", createStudent);
server.get("/student", fetcAllStudent);
server.get("/", basePath);
server.get("/student/:id", fetchById);
server.put("/student/:studentId", updateStudent);
server.delete("/student/:studentId", deleteStudent);
server.all("*", notFound);

//TEACHER'S ROUTES

server.post("/teacher", createTeacher);
server.put("/teacher/:teacherId", UpdateTeacherById);
server.get("/teacher/:teacherId", fetchTeacherById);
server.get("/teacher", fetchTeacherById);

//DATABASE CONNECTION
server.listen(port, async () => {
  try {
    console.log(`server connected to port ${port}`);
    await mongoose.connect("mongodb://127.0.0.1:27017/store-collection");
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
});
