import User from "./User.model.js";
import Course from "./Course.model.js";
import Lecture from "./Video_Lecture.model.js";
import Assignment from "./Assignment.model.js";
import Category from "./Course_category.model.js";
import Enrollment from "./Enrollment.model.js";

// Function to define associations
const associateModels = () => {
    // USER ↔ COURSE
    User.hasMany(Course, {
        foreignKey: "instructor_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    Course.belongsTo(User, {
        foreignKey: "instructor_id",
    });

    // CATEGORY ↔ COURSE
    Category.hasMany(Course, {
        foreignKey: "category_id",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    });
    Course.belongsTo(Category, {
        foreignKey: "category_id",
    });

    // COURSE ↔ LECTURE
    Course.hasMany(Lecture, {
        foreignKey: "course_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    Lecture.belongsTo(Course, {
        foreignKey: "course_id",
    });

    // COURSE ↔ ASSIGNMENT
    Course.hasMany(Assignment, {
        foreignKey: "course_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    Assignment.belongsTo(Course, {
        foreignKey: "course_id",
    });

    // LECTURE ↔ ASSIGNMENT (optional)
    Lecture.hasMany(Assignment, {
        foreignKey: "lecture_id",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    });
    Assignment.belongsTo(Lecture, {
        foreignKey: "lecture_id",
    });

    // USER ↔ ENROLLMENT
    User.hasMany(Enrollment, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    Enrollment.belongsTo(User, {
        foreignKey: "user_id",
    });

    // COURSE ↔ ENROLLMENT
    Course.hasMany(Enrollment, {
        foreignKey: "course_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    Enrollment.belongsTo(Course, {
        foreignKey: "course_id",
    });
};

export default associateModels;
