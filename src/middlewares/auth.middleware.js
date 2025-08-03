import { body, validationResult } from "express-validator";
import { ApiResponse } from "../utils/ApiResponse.js";

const validateRegister = [
    body("fname").notEmpty().withMessage("first name is required"),
    body("lname").notEmpty().withMessage("last name is required"),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("valid email is required"),
    body("contact")
        .isLength({ min: 10, max: 10 })
        .withMessage("valid contact number is requred"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("Password must contain at least one special character"),
    body("user_type")
        .notEmpty()
        .withMessage("user type required")
        .isIn(["admin", "teacher", "student"]),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formatted = errors.array().map((e) => ({
                field: e.param,
                message: e.msg,
                value: e.value,
            }));
            return res
                .status(400)
                .json(new ApiResponse(400, formatted, "validation failed"));
        }

        next();
    },
];

const validateVerifyRegister = [
    body("email").notEmpty().withMessage("email ie required"),
    (req, res, nest) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formatted = errors.array().map((e) => ({
                field: e.param,
                message: e.msg,
                value: e.value,
            }));
            return res
                .status(400)
                .json(new ApiResponse(400, formatted, "validation failed"));
        }

        next();
    },
];

const validateCheckVerificationCode = [
    body("email").notEmpty().withMessage("email is required"),
    body("code").notEmpty().withMessage("varification code is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formatted = errors.array().map((e) => ({
                field: e.param,
                message: e.msg,
                value: e.value,
            }));
            return res
                .status(400)
                .json(new ApiResponse(400, formatted, "validation failed"));
        }

        next();
    },
];

export {
    validateRegister,
    validateVerifyRegister,
    validateCheckVerificationCode,
};
