const express = require('express');
const { handleUserSignup, handleUserLogin } = require('../controllers/user');


const router = express.Router();

router.post('/', handleUserSignup);
router.post('/login', handleUserLogin); // almost same code h sign up jiasa

module.exports = router ;
