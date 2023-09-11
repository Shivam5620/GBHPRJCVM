import express from 'express';
import { loginController, registerController, protectedrout } from '../controllers/authController.js'
import { IsAdmin, requireSignIn } from '../middlewares/authMiddleware.js';


const router = express.Router();

// routing
// register methode || post method

router.post('/register', registerController)

// login || post method

router.post('/login', loginController)

// test route

router.get('/test' ,requireSignIn,IsAdmin, protectedrout)



export default router;