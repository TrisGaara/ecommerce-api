import express from 'express';

/**
 * We can import controller here and use it
 */
const { registerUser } = require('../controllers/userController');

const router = express.Router();

router.get('/test', registerUser);

export default router;