const shortid = require('shortid');
const Link = require('../models/link-model');
const ApiError = require('../exceptions/api-error');

exports.generateShortLink = async (owner, originalLink) => {
  const existing = await Link.findOne({ owner, originalLink });
  if (existing) {
    return existing;
  }

  const code = shortid.generate();
  const shortLink = `${process.env.BASE_URL}/t/${code}`;
  const link = await Link.create({ originalLink, shortLink, code, owner });

  return link;
};

exports.getUserLinks = async (owner) => {
  const links = await Link.find({ owner }, 'originalLink shortLink code -_id');
  return links;
};

exports.getLinkByCode = async (code) => {
  const link = await Link.findOne(
    { code },
    'originalLink shortLink clicks date -_id'
  );
  return link;
};

exports.getOriginalLink = async (code) => {
  const link = await Link.findOne({ code });
  if (!link) {
    throw ApiError.NotFound('Ссылка не найдена');
  }

  link.clicks++;
  await link.save();
  return link.originalLink;
};
