const { validationResult } = require('express-validator');
const userService = require('../services/user-service');
const ApiError = require('../exceptions/api-error');

exports.registration = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(
        ApiError.BadRequest(
          'Некорректные данные при регистрации',
          errors.array()
        )
      );
    }

    const { email, password } = req.body;
    const tokens = await userService.registration(email, password);
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
    });

    return res.status(201).json({ message: 'Пользователь создан', ...tokens });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(
        ApiError.BadRequest(
          'Некорректные данные при входе в систему',
          errors.array()
        )
      );
    }

    const { email, password } = req.body;
    const tokens = await userService.login(email, password);
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
    });

    return res.json({ message: 'Вход выполнен', ...tokens });
  } catch (e) {
    next(e);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    await userService.logout(refreshToken);
    res.clearCookie('refreshToken');

    return res.json({ message: 'Выход выполнен' });
  } catch (e) {
    next(e);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const tokens = await userService.refresh(refreshToken);
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
    });

    return res.json({ message: 'Токены обновлены', ...tokens });
  } catch (e) {
    next(e);
  }
};
