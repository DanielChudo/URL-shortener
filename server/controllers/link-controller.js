const { validationResult } = require('express-validator');
const linkService = require('../services/link-service');
const ApiError = require('../exceptions/api-error');

exports.generateShortLink = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Некорректная ссылка', errors.array()));
    }

    const { originalLink } = req.body;
    const shortLink = await linkService.generateShortLink(
      req.user.userId,
      originalLink
    );

    res.status(201).json({ code: shortLink.code });
  } catch (e) {
    next(e);
  }
};

exports.getUserLinks = async (req, res, next) => {
  try {
    const links = await linkService.getUserLinks(req.user.userId);
    res.json({ links });
  } catch (e) {
    next(e);
  }
};

exports.getLinkByCode = async (req, res, next) => {
  try {
    const link = await linkService.getLinkByCode(req.params.code);
    res.json({ link });
  } catch (e) {
    next(e);
  }
};

exports.redirectToLink = async (req, res, next) => {
  try {
    const originalLink = await linkService.getOriginalLink(req.params.code);
    res.redirect(originalLink);
  } catch (e) {
    next(e);
  }
};
