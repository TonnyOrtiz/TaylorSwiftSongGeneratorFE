import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import appconst from '../config/constants.js';

const { USERNAMEMAXLENGTH } = appconst;
const { PASSWORDMAXLENGTH } = appconst;
const { EMAILMAXLENGTH } = appconst;

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate (models) {
    // define association here
    User.hasMany(models.Comment, {
      foreignKey: 'author',
      sourceKey: 'id'
    });
    User.hasMany(models.Post, {
      foreignKey: 'author',
      sourceKey: 'id'
    });
  }
}
User.init({
  id: { type: DataTypes.STRING(36), primaryKey: true },
  username: { type: DataTypes.STRING(USERNAMEMAXLENGTH), unique: true },
  legalName: DataTypes.STRING(100),
  isAdmin: DataTypes.BOOLEAN,
  email: { type: DataTypes.STRING(EMAILMAXLENGTH), unique: true },
  password: DataTypes.STRING(PASSWORDMAXLENGTH)
}, {
  sequelize,
  modelName: 'User'
});

export default User;
