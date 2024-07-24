import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper";
import { registerController } from "../controllers/auth";
import { validateBody } from "../middlewares/validateBody";
import { userValidationSchema } from "../validation/auth";

const router = Router();

router.post('/register', validateBody(userValidationSchema), ctrlWrapper(registerController));

export default router;
