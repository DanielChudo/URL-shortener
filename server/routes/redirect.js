const express = require('express');
const linkController = require('../controllers/link-controller');

const router = express.Router();

router.get('/:code', linkController.redirectToLink);

module.exports = router;
