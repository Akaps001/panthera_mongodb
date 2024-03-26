const { teacher, Teacher } = require("../Models/teacher.model");
//CREATING TEACHERS PROFILE
const createTeacher = async (req, res) => {
  try {
    //checking if teacher name exit
    let teacherExit = await Teacher.findOne({ name: req.body.name });
    if (teacherExit)
      return res
        .status(400)
        .json({ message: "teacher name or id already exit" });

    let teacher = new Teacher(req.body);
    await teacher.save();
    res
      .status(201)
      .json({ message: "teacher created successfully", data: teacher });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
// FETCHING ALL TEACHERS
const fetchAllTeachers = async () => {
  try {
    let teachers = await Teacher.find({});
    res.status(201).json({
      message: "teacher successfully fetched",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
//FETCHING THE TEACHERS BY ID
const fetchTeacherById = async (req, res) => {
  try {
    let teacherId = req.params.id;
    let teacherExit = await Teacher.findById(teacherId);
    if (!teacherExit) {
      return res
        .status(404)
        .json({ message: "teacher Id is not valid", data: teacher });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
//UPDATING THE TEACHER BY ID
const UpdateTeacherById = async () => {
  try {
    let teacherId = req.params.teacherId;
    let teacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { $set: req.body },
      { new: true }
    );
    res
      .status(201)
      .json({ message: "teacher sucessfully updated", data: teacher });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
//DELETING TEACHER
const deleteTeacher = async (req, res) => {
  try {
    let teacherId = req.params.id;
    const teacher = await Teacher.findByIdAndDelete({ _id: teacherId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createTeacher,
  UpdateTeacherById,
  fetchTeacherById,
  fetchAllTeachers,
  deleteTeacher,
};
