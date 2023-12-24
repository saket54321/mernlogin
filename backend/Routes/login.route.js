import express from "express";
import checkUser from '../middleware/login.middleware.js'
import usercontroller from "../Controllers/login.controller.js";
const router =express.Router();
router.post('/register',usercontroller.register);
router.post('/login',usercontroller.login);
router.post('/',checkUser);
router.put('/update',usercontroller.update);

export default router;