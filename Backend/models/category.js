import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import appconst from '../config/constants.js';

class Category extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate (models) {
    // define association here
    Category.hasMany(models.Post, {
      foreignKey: 'categoryId',
      sourceKey: 'id'
    });
  }
}
Category.init({
  name: DataTypes.STRING(appconst.CATEGORYMAXLENGTH),
  createdAt: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Category'
});

export default Category;
