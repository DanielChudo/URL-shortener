const express = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const linkController = require('../controllers/link-controller');

const router = express.Router();

const regexURL =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

router.post(
  '/generate-link',
  authMiddleware,
  body('originalLink')
    .trim()
    .matches(regexURL)
    .withMessage('Некорректная ссылка'),
  linkController.generateShortLink
);

router.get('/all', authMiddleware, linkController.getUserLinks);

router.get('/:code', authMiddleware, linkController.getLinkByCode);

module.exports = router;
