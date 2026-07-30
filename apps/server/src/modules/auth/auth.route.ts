import { Router } from "express";
import { validate } from "@/middleware/validate.middleware.js";
import { authenticate } from "@/middleware/auth.middleware.js";
import { registerController, loginController, getMeController } from "./auth.controller.js";
import { registerSchema } from "./validations/register.validation.js";
import { loginSchema } from "./validations/login.validation.js";

const router = Router();

// Public
router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), loginController);

// Protected
router.get("/me", authenticate, getMeController);

export default router;
