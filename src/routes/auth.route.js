import { Router } from "express";
import {
    registerUser,
    verifyRegisterUser,
    checkVerificationCode,
} from "../controllers/auth.controller.js";
import {
    validateRegister,
    validateVerifyRegister,
    validateCheckVerificationCode,
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

export default router;
