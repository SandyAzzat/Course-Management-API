const Course = require("../models/course.model");
const fs = require("fs");
const path = require("path");
const courseSchemaValidation = require('../validators/course.validator');

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
};

const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course', error: error.message });
    }
};

const addNewCourse = async (req, res) => {
    try {
        const { title, description, startDate, endDate, price } = req.body;
        let image = "";
        if (req.file) {
            image = `https://course-management-api-git-main-sandy-azzats-projects.vercel.app/uploads/${req.file.filename}`; 
        }
        const { error } = courseSchemaValidation.validate({
            title,
            description,
            image,
            startDate,
            endDate,
            price,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newCourse = new Course({ title, description, image, startDate, endDate, price });
        await newCourse.save();
        res.status(201).json({
            message: "Course added successfully",
            course: newCourse,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding course', error: error.message });
    }
};

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, startDate, endDate, price } = req.body;

    const { error } = courseSchemaValidation.validate({
        title,
        description,
        image: req.file ? `https://course-management-api-git-main-sandy-azzats-projects.vercel.app/uploads/${req.file.filename}` : req.body.image,
        startDate,
        endDate,
        price,
    });
    if (error) {
        return res.status(400).json({ message: 'Validation failed', error: error.details });
    }

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (course.image && req.file) {
            const oldImagePath = path.resolve(__dirname, '..', 'uploads', path.basename(course.image));
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        const image = req.file ? `https://course-management-api-git-main-sandy-azzats-projects.vercel.app/uploads/${req.file.filename}` : course.image;

        const updatedData = {
            title,
            description,
            startDate,
            endDate,
            price,
            image,
        };

        const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, { new: true });

        res.status(200).json({
            message: "Course updated successfully",
            course: updatedCourse,
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating course", error: error.message });
    }
};

const deleteCourse = async (req, res) => {
    const { id } = req.params;
    
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (course.image) {
            const imagePath = path.join(__dirname, '..', 'uploads', path.basename(course.image));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        const deletedCourse = await Course.findByIdAndDelete(id);

        res.status(200).json({message: "Course deleted successfully",course: deletedCourse,});
    } catch (error) {
        res.status(500).json({message: 'Error deleting course',error: error.message,});
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    addNewCourse,
    updateCourse,
    deleteCourse,
};
