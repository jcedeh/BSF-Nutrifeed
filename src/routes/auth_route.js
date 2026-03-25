import express from 'express';
import { sign_up_controller,
         login_controller
 } from '../controllers/auth_controller.js';
import { validateRequest } from '../middlewares/validation_middleware.js';
import { login_schema, signup_schema } from '../validations/auth_validation.js';

const router = express.Router();

router.post("/sign_up", validateRequest(signup_schema), sign_up_controller);
router.post("/login", validateRequest(login_schema), login_controller);

export default router;