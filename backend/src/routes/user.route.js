import { Router } from "express"

import { registerUser, adminLogin, adminRegister } from "../controllers/user.controller.js"

const router = Router();

// auth routes
router.route('/register').post(registerUser);
router.route('/adminLogin').post(adminLogin)
router.route('/adminRegister').post(adminRegister);



export default router
