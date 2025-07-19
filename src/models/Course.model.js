import { DataTypes } from "sequelize";
import sequelize from "../config/db/db.js";

const Course = sequelize.define(
    "Course",
    {
        course_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        instructor_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "user_id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("Draft", "Published"),
            allowNull: false,
            defaultValue: "Draft",
        },
        cover_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "categories",
                key: "category_id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: "courses", // optional but explicit
    }
);

export default Course;
