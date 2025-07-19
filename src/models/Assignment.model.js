import { DataTypes } from "sequelize";
import sequelize from "../config/db/db.js";

const Assignment = sequelize.define(
    "Assignment",
    {
        assignment_id: {
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
        file_url: {
            type: DataTypes.STRING,
            allowNull: false, // URL or path to uploaded PDF
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
        lecture_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "lectures",
                key: "lecture_id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: "assignments",
    }
);

export default Assignment;
