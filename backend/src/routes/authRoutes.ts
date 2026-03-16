import { Router } from 'express';
import * as authController from '../controllers/authController';
import { otpRateLimit } from '../middleware/auth';

const router = Router();

router.post('/google', authController.googleAuth);
router.post('/phone/send-otp', otpRateLimit, authController.sendOtp);
router.post('/phone/verify-otp', authController.verifyOtp);
router.post('/email/signup', authController.signup);
router.post('/email/login', authController.login);
router.post('/logout', authController.logout);

export default router;
