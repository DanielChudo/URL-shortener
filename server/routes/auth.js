const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user-controller');

const router = express.Router();

router.post(
  '/registration',
  body('email').trim().isEmail().withMessage('Некорректная почта'),
  body('password')
    .isLength({ min: 6, max: 32 })
    .withMessage('Пароль должен содержать от 6 до 32 символов'),
  userController.registration
);

router.post(
  '/login',
  body('email').trim().isEmail().withMessage('Некорректная почта'),
  body('password')
    .isLength({ min: 6, max: 32 })
    .withMessage('Пароль должен содержать от 6 до 32 символов'),
  userController.login
);

router.post('/logout', userController.logout);

router.get('/refresh', userController.refresh);

module.exports = router;
