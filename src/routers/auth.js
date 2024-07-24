import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper";
import { loginUserController, registerController } from "../controllers/auth";
import { validateBody } from "../middlewares/validateBody";
import { userLoginSchema, userValidationSchema } from "../validation/auth";

const router = Router();

router.post('/register', validateBody(userValidationSchema), ctrlWrapper(registerController));
router.post('/login', validateBody(userLoginSchema), ctrlWrapper(loginUserController));

export default router;
