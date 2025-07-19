import { DataTypes } from "sequelize";
import sequelize from "../config/db/db.js";

const Lecture = sequelize.define(
    "Lecture",
    {
        lecture_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        video_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER, // Duration in minutes
            allowNull: false,
        },
        course_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "courses",
                key: "course_id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: "lectures",
    }
);

export default Lecture;
