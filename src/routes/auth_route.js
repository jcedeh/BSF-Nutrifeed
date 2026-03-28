import express from 'express';
import { sign_up_controller,
         login_controller,
         verify_account_controller,
         forget_password_controller,
         reset_password_controller
 } from '../controllers/auth_controller.js';
import { validateRequest } from '../middlewares/validation_middleware.js';
import { login_schema, signup_schema } from '../validations/auth_validation.js';
import { api_rate_limit } from '../middlewares/rate_limit_middleware.js';

const router = express.Router();

router.post("/sign_up", validateRequest(signup_schema), api_rate_limit, sign_up_controller);
router.post("/login", validateRequest(login_schema), api_rate_limit, login_controller);
router.get("/verify-email", api_rate_limit, verify_account_controller);
router.post("/forgot-password", api_rate_limit, forget_password_controller);
router.post("/reset-password", api_rate_limit, reset_password_controller);

export default router;