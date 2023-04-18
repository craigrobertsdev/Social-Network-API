const router = require("express").Router();
const {
  getStudents,
  getSingleStudent,
  createStudent,
  deleteStudent,
  addAssignment,
  removeAssignment,
} = require("../../controllers/userController");

// /api/students
router.route("/").get(getStudents).post(createStudent);

// /api/students/:studentId
router.route("/:userId").get(getSingleStudent).delete(deleteStudent);

// /api/students/:studentId/assignments
router.route("/:userId/assignments").post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route("/:userId/assignments/:assignmentId").delete(removeAssignment);

module.exports = router;
