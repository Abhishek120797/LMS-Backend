import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendRegisterMail = async (emailId) => {
    try {
        await resend.emails.send({
            from: "register@edu-connect.online",
            to: [emailId],
            subject: "Welcome to edu-connect",
            html: `<strong>Registration succesfully to Edu-Conect</strong>`,
        });

        return {
            success: true,
            message: "User registeration email send successfully",
        };
    } catch (error) {
        console.log("Error while sending registeration mail");
        return {
            success: false,
            message: "User registeration email throws error",
        };
    }
};

const sendVerificationCode = async (emailId, verifyCode) => {
    try {
        await resend.emails.send({
            from: "verification@edu-connect.online",
            to: [emailId],
            subject: "Verify your Email",
            html: `<strong>Verification code ${verifyCode}</strong>`,
        });

        return {
            success: true,
            message: "Verification email send successfully",
        };
    } catch (error) {
        console.log("Error while sending verification mail");
        return {
            success: false,
            message: "User Verification email throws error",
        };
    }
};

export { sendRegisterMail, sendVerificationCode };
