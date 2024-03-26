const mongoose = require("mongoose");

const teacherSchema = {
  name: { type: String, required: true },
  age: { type: Number, require: true },
  class: { type: String, requires: true },
  favcourse: { type: String, required: true },
  email: { type: String, required: true },
};

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = { Teacher };
