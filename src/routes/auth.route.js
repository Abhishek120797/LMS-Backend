import { Router } from "express";
import {
    registerUser,
    verifyRegisterUser,
    checkVerificationCode,
    login,
    logout,
    refreshAccessToken,
} from "../controllers/auth.controller.js";
import {
    validateRegister,
    validateVerifyRegister,
    validateCheckVerificationCode,
    validateLogin,
    verifyToken,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(upload.none(), validateRegister, registerUser);
router
    .route("/register/verifyRegister")
    .post(upload.none(), validateVerifyRegister, verifyRegisterUser);

router
    .route("/register/verifyRegister/verifyCode")
    .post(upload.none(), validateCheckVerificationCode, checkVerificationCode);

router.route("/login").post(upload.none(), validateLogin, login);

//secure route
router.route("/logout").post(verifyToken, logout);

router.route("/refresh-access-token").post(refreshAccessToken);

export default router;
