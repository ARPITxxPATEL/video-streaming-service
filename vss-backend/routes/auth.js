const router = require('express').Router();
const authController = require('../controllers/auth/authControllers');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    password: Joi.string().min(6).max(12).required(),
    email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).max(12).required(),
    email: Joi.string().email().required(),
});

router.post('/register', validator.body(registerSchema), authController.controllers.postRegister);

router.post('/login', validator.body(loginSchema), authController.controllers.postLogin);

module.exports = router;