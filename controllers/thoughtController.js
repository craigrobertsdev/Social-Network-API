const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find().select("-__v").populate("reactions");
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a course
  async getSingleCourse(req, res) {
    try {
      const course = await Course.findOne({ _id: req.params.courseId }).select("-__v");

      if (!course) {
        return res.status(404).json({ message: "No course with that ID" });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      console.log(thought._id.id);
      const userToUpdate = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } }
      );

      // userToUpdate.thoughts.push(thought._id);

      // await userToUpdate.save();
      res.status(200).json({ thought, userToUpdate });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err.message);
    }
  },
  // Delete a course
  async deleteCourse(req, res) {
    try {
      const course = await Course.findOneAndDelete({ _id: req.params.courseId });

      if (!course) {
        res.status(404).json({ message: "No course with that ID" });
      }

      await Student.deleteMany({ _id: { $in: course.students } });
      res.json({ message: "Course and students deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a course
  async updateCourse(req, res) {
    try {
      const course = await Course.findOneAndUpdate(
        { _id: req.params.courseId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!course) {
        res.status(404).json({ message: "No course with this id!" });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
