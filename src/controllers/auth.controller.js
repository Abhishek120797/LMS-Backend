import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/User.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { generateOTP, hashOTP, compareOTP } from "../utils/OneTimePass.js";
import { sendRegisterMail, sendVerificationCode } from "../utils/mail.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fname, lname, email, contact, password, user_type } = req.body;

    const emailNormalized = email.trim().toLowerCase();

    const userByEmail = await User.findOne({
        where: { email: emailNormalized },
    });

    if (userByEmail) {
        throw new ApiError(409, "User with email already exists");
    }

    const user_object = {
        first_name: fname,
        last_name: lname,
        email: emailNormalized,
        contact: contact,
        user_type: user_type,
        password: password,
        is_verified: false,
    };

    const user = await User.create(user_object);

    const createdUser = await User.findByPk(user.user_id, {
        attributes: {
            exclude: ["password", "refresh_token", "verification_code"],
        },
    });

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }
    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, "User registered Successfully")
        );
});

const verifyRegisterUser = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const emailNormalized = email.trim().toLowerCase();
    const user = await User.findOne({ where: { email: emailNormalized } });

    if (user) {
        if (!user.is_verified) {
            const code = generateOTP();

            user.verification_code = await hashOTP(code);

            await user.save();

            const { success, message } = await sendVerificationCode(
                emailNormalized,
                code
            );

            if (!success) {
                throw new ApiError(500, message);
            } else {
                return res.status(201).json(new ApiResponse(201, {}, message));
            }
        } else {
            throw new ApiError(404, "user not registerd");
        }
    }
});

const checkVerificationCode = asyncHandler(async (req, res) => {
    const { email, code } = req.body;

    const emailNormalized = email.trim().toLowerCase();
    const user = await User.findOne({ where: { email: emailNormalized } });

    if (!user) {
        throw new ApiError(404, "User not registered");
    }

    if (user.is_verified) {
        return res
            .status(200)
            .json(new ApiResponse(200, null, "User already verified"));
    }

    if (await compareOTP(code, user.verification_code)) {
        user.is_verified = true;
        await user.save();

        const { success, message } = await sendRegisterMail(emailNormalized);

        if (success) {
            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        {},
                        "user registration verification done successfully"
                    )
                );
        } else {
            return res.status(500).json(new ApiError(500, message));
        }
    } else {
        throw new ApiError(400, "Incorrect verification code");
    }
});

export { registerUser, verifyRegisterUser, checkVerificationCode };
