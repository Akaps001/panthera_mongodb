// firstly we declare mongoose variable
const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: String, requiresd: true },
  favcourse: { type: String, required: true },
  email: { type: String, required: true },
  teacher: { type: mongoose.Types.ObjectId, ref: "Teacher" },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
