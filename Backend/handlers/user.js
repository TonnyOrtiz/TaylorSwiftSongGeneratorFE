import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validation from '../utils/validation.js';
import appConfig from '../config/constants.js';
import models from '../models/index.js';
const { User } = models;

class UsersController {
  static async index (req, res, next) {
    res.render('user/login', { title: 'Contactos' });
  }

  static async validateName (req, res) {
    try {
      await validation.newUsername(req.query.username);
      res.json({ valid: true, message: 'Nombre de usuario disponible' });
    } catch (error) {
      res.json({ valid: false, message: error.message });
    }
    // the json object is {valid: true, message: 'Nombre de usuario disponible'}
  }

  static async validateEmail (req, res) {
    try {
      await validation.newEmail(req.query.email);
      res.json({ valid: true, message: 'Email disponible' });
    } catch (error) {
      res.json({ valid: false, message: error.message });
    }
  }

  static async signin (req, res) {
    if (req.method === 'POST') {
      try {
        await validation.newUsername(req.body.username);
        await validation.newPassword(req.body.password);
        let newEmail = null;
        if (req.body.email) {
          await validation.newEmail(req.body.email);
          newEmail = req.body.email;
        }
        const hashedPassword = await bcrypt.hash(req.body.password, appConfig.SALTROUNDS);
        await User.create(
          {
            id: crypto.randomUUID(),
            username: req.body.username,
            password: hashedPassword,
            legalName: req.body.legalName,
            isAdmin: true,
            email: newEmail
          }
        );
        const user = await User.findOne({ where: { username: req.body.username } });
        const token = jwt.sign({ id: user.id, username: user.username }, appConfig.JWTSECRETKEY, {
          expiresIn: appConfig.JWTEXPIRESIN
        });
        res.cookie('acces_token', token, {
          httpOnly: true,
          // secure: process.env.NODE_ENV === 'production', // Only set cookies in https in production
          sameSite: 'strict', // Protect against CSRF
          maxAge: parseInt(appConfig.JWTEXPIRESIN.replace('h', ''), 10) * 1000 * 60 * 60 // Convert to milliseconds
        });
        req.session.username = user.username;
        req.session.flashMessage = 'Usuario registrado correctamente';
        req.session.save();
        res.redirect('/');
      } catch (Exception) {
        console.log('CATCH AQUI');
        console.log(Exception);
        res.render('user/signin', { title: 'Registrarse', layout: 'layoutSignin', error: Exception.message });
      }
    } else {
      if (req.session.username !== null) {
        return res.redirect('/');
      }
      res.render('user/signin', { title: 'Registrarse', layout: 'layoutSignin' });
    }
  }

  static async login (req, res, next) {
    if (req.method === 'POST') {
      try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) {
          res.render('user/login', { title: 'Iniciar sesión', error: 'El Usuario no existe', layout: 'layoutLogin' });
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
          res.render('user/login', { title: 'Iniciar sesión', error: 'Contraseña incorrecta, por favor intentelo de nuevo', layout: 'layoutLogin' });
        } else {
          const token = jwt.sign({ id: user.id, username: user.username }, appConfig.JWTSECRETKEY, {
            expiresIn: appConfig.JWTEXPIRESIN
          });
          res.cookie('acces_token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // Only set cookies in https in production
            sameSite: 'strict', // Protect against CSRF
            maxAge: parseInt(appConfig.JWTEXPIRESIN.replace('h', ''), 10) * 1000 * 60 * 60 // Convert to milliseconds
          });
          req.session.username = user.username;
          req.session.save();
          res.redirect('/');
        }
      } catch (error) {
        res.render('user/login', { title: 'Iniciar sesión', error: error.message, layout: 'layoutLogin' });
      }
    } else {
      if (req.session.username !== null) {
        return res.redirect('/');
      }
      res.render('user/login', { title: 'Iniciar sesión', flashMessage: req.session.flashMessage, error: req.session.error, layout: 'layoutLogin' });
    }
  }

  static async logout (req, res) {
    req.session.destroy();
    res.clearCookie('acces_token');
    res.redirect('/user/login');
  }
}

export default UsersController;
