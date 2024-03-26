//inside the controller we must import the model at first
const { Student } = require("../Models/Student.model");

//for the basePath
const basePath = (req, res) => {
  try {
    res.status(201).json({
      message: "welcome to our platform",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error when creating student",
    });
  }
};

//not found

const notFound = (req, res) => {
  try {
    res.status(400).json({
      message: "page not found",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error when creating student",
    });
  }
};

//creating student

const createStudent = async (req, res) => {
  try {
    let studentExit = await Student.findOne({ name: req.body.name });
    if (studentExit)
      res.status(400).json({ messaage: "student name or id already exit" });
    //
    let student = new Student(req.body);
    await student.save();
    res.status(201).json({
      message: "student created successfully",
      data: {
        _id: student.id,
        name: student.name,
        email: student.email,
        teacher: student.teacher.ref,
        age: student.age,
        favcourse: student.favcourse,
        class: student.class,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

//getting all student

const fetcAllStudent = async (req, res) => {
  try {
    let students = await Student.find({});
    res.status(201).json({
      message: "student fetched successfully",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      messaage: "Error when fetching student",
    });
  }
};

const fetchById = async (req, res) => {
  try {
    let studentId = req.params.id;
    let studentExit = await Student.findById(studentId).populate("teacher");
    if (!studentExit) {
      return res.status(404).json({
        messaage: "studentId not found,student with that Id does not exit",
      });
    }
    return res
      .status(200)
      .json({ messaage: "student fetched successfully", data: studentExit });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messaage: "server error" });
  }
};

const updateStudent = async (req, res) => {
  try {
    let studentId = req.params.studentId;
    let studentExit = await Student.findById(studentId);
    if (!studentExit) {
      return res.status(400).json({ message: "student does not exit" });
    }
    let student = await Student.updateOne(req.body);

    res
      .status(201)
      .json({ messaage: "Student successfully updated", data: studentExit });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messaage: error.messaage });
  }
};

// deleting student
const deleteStudent = async (req, res) => {
  try {
    let studentId = req.params.id;
    let student = await Student.deleteOne({ _id: studentId });
    if (!studentId) {
      return res
        .status(200)
        .json({ messaage: "student Id already deleted..." });
    }
    return res.status(200).json({ messaage: "student sucessfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messaage: error.messaage });
  }
};

module.exports = {
  basePath,
  fetcAllStudent,
  createStudent,
  notFound,
  fetchById,
  updateStudent,
  deleteStudent,
};
