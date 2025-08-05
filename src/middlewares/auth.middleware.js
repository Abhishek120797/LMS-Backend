import { body, validationResult } from "express-validator";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

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

const validateLogin = [
    body("email").notEmpty().withMessage("email is required"),
    body("password").notEmpty().withMessage("password is required"),
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

const verifyToken = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized reques");
        }

        const decodeddToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        const user = await User.findByPk(decodeddToken?.user_id, {
            attributes: {
                exclude: ["password", "refresh_token"],
            },
        });

        if (!user) {
            throw new ApiError(401, "Invaid access token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export {
    validateRegister,
    validateVerifyRegister,
    validateCheckVerificationCode,
    validateLogin,
    verifyToken,
};
