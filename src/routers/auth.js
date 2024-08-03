import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { doResetPasswordController, loginUserController, logoutUserController, refreshUserController, registerController, resetPasswordController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { doResetPasswordSchema, resetPasswordSchema, userLoginSchema, userValidationSchema } from "../validation/auth.js";

const router = Router();

router.post('/register', validateBody(userValidationSchema), ctrlWrapper(registerController));
router.post('/login', validateBody(userLoginSchema), ctrlWrapper(loginUserController));
router.post('/refresh', ctrlWrapper(refreshUserController));
router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/send-reset-email', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));
router.post('/reset-pwd', validateBody(doResetPasswordSchema), ctrlWrapper(doResetPasswordController));

export default router;
