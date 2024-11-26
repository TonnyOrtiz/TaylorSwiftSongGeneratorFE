import appconfig from '../config/constants.js';

import User from '../models/user.js';

class Validation {
  static async newEmail (newEmail) {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(newEmail)) {
      throw new Error('Formato inválido. Debe tener la forma: ejemplo@correo.com');
    }
    const user = await User.findOne({ where: { email: newEmail } });
    if (user) {
      throw new Error('Este correo ya está registrado con otra cuenta.');
    }
    return true;
  }

  static newPassword (newPassword) {
    if (newPassword.length >= appconfig.PASSWORDMAXLENGTH) {
      throw new Error(`Password must be less than ${appconfig.PASSWORDMAXLENGTH} characters`);
    }
    if (newPassword.length < appconfig.PASSWORDMINLENGTH) {
      throw new Error(`Password must be more than ${appconfig.PASSWORDMINLENGTH} characters`);
    }
    return true;
  }

  static async newUsername (newUsername) {
    const user = await User.findOne({ where: { username: newUsername } });
    if (user) {
      throw new Error('El nombre de usuario ya existe.');
    }
    if (newUsername.length >= appconfig.USERNAMEMAXLENGTH) {
      throw new Error(`Excede el tamaño máximo de ${appconfig.USERNAMEMAXLENGTH} letras.`);
    }
    if (newUsername.length < appconfig.USERNAMEMINLENGTH) {
      throw new Error(`El tamaño debe ser mayor a ${appconfig.USERNAMEMINLENGTH} letras.`);
    }
    return true;
  }

  static async validateUserId (id) {
    const user = await User.findOne({ where: { id } });
    if (typeof user === 'undefined') {
      console.log('User not found');
      console.log(user.id);
      return false;
    } else {
      console.log('User found');
      return true;
    }
  }
}

export default Validation;
