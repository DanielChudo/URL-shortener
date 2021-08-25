const bcrypt = require('bcryptjs');
const User = require('../models/user-model');
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');

exports.registration = async (email, password) => {
  const canditate = await User.findOne({ email });
  if (canditate) {
    throw ApiError.BadRequest('Пользователь с такой почтой уже существует');
  }

  const hashPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ email, password: hashPassword });
  const tokens = tokenService.generateTokens({ userId: user._id });
  await tokenService.saveRefreshToken(user._id, tokens.refreshToken);

  return { ...tokens };
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.BadRequest('Пользователь с такой почтой не найден');
  }

  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    // в реальных проектах не стоит уточнять, что именно неверно
    throw ApiError.BadRequest('Неверный пароль');
  }

  const tokens = tokenService.generateTokens({ userId: user._id });
  await tokenService.saveRefreshToken(user._id, tokens.refreshToken);

  return { ...tokens };
};

exports.logout = async (refreshToken) => {
  await tokenService.removeRefreshToken(refreshToken);
};

exports.refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }

  const userData = tokenService.validateRefreshToken(refreshToken);
  const tokenFromDB = await tokenService.findRefreshToken(refreshToken);
  if (!userData || !tokenFromDB) {
    throw ApiError.UnauthorizedError();
  }
  const user = await User.findById(userData.userId);
  const tokens = tokenService.generateTokens({ userId: user._id });
  await tokenService.saveRefreshToken(user._id, tokens.refreshToken);

  return { ...tokens };
};
