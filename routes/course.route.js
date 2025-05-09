const express = require("express");
const router = express.Router();
const upload = require("../upload.middleware");

const {
    getAllCourses,
    getCourseById,
    addNewCourse,
    updateCourse,
    deleteCourse,
} = require("../controllers/course.controller");


router.get("/", getAllCourses);

router.get("/:id", getCourseById);

router.post("/", upload.single("image"), addNewCourse);

router.put("/:id", upload.single("image"), updateCourse);

router.delete("/:id", deleteCourse);

module.exports = router;

/*
Method   Route              Description
GET     /api/courses        Get all courses
GET     /api/courses/:id    Get single course by ID
POST    /api/courses        Add a new course
PUT     /api/courses/:id    Update existing course
DELETE  /api/courses/:id    Delete course by ID
*/
