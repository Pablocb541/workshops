const courseModel = require("../models/courseModel");

const courseGetAll = () => {
  return courseModel.find().populate('teacher').exec();
};

const courseSearch = (params) => {
  return courseModel.find({ "name": { $regex: `${params.name}`, $options: 'i' } })
    .populate('teacher').exec();
};

const getCourseById = (params) => {
  return courseModel.findById(params.id).populate('teacher').exec();
};

module.exports = {
  courseGetAll,
  courseSearch,
  getCourseById
};
