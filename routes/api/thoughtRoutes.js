const router = require("express").Router();
const {
  getThoughts,
  getSingleCourse,
  createThought,
  updateCourse,
  deleteCourse,
} = require("../../controllers/thoughtController.js");

// /api/courses
router.route("/").get(getThoughts).post(createThought);

// /api/courses/:courseId
router.route("/:courseId").get(getSingleCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
