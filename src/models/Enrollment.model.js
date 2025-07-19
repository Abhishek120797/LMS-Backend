import { DataTypes } from "sequelize";
import sequelize from "../config/db/db.js";

const Enrollment = sequelize.define(
    "Enrollment",
    {
        enrollment_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "user_id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
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
        enrollment_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: "enrollments",
    }
);

export default Enrollment;
