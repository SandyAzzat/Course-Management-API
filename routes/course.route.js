const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");

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

