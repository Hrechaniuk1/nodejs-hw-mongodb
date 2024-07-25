import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper";
import { loginUserController, logoutUserController, refreshUserController, registerController } from "../controllers/auth";
import { validateBody } from "../middlewares/validateBody";
import { userLoginSchema, userValidationSchema } from "../validation/auth";

const router = Router();

router.post('/register', validateBody(userValidationSchema), ctrlWrapper(registerController));
router.post('/login', validateBody(userLoginSchema), ctrlWrapper(loginUserController));
router.post('/refresh', ctrlWrapper(refreshUserController));
router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
