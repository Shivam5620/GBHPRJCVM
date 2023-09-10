import express from 'express';
import { loginController, registerController } from '../controllers/authController.js'


const router = express.Router();

// routing
// register methode || post method

router.post('/register', registerController)

// login || post method

router.post('login', loginController)
export default router;