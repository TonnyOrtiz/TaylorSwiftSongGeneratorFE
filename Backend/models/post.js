import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Post extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate (models) {
    // define association here
    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      sourceKey: 'id'
    });
    Post.belongsTo(models.User, {
      foreignKey: 'author',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
    Post.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      targetKey: 'id',
      onDelete: 'SET NULL'
    });
  }
}
Post.init({
  title: DataTypes.STRING,
  image: DataTypes.STRING,
  summary: DataTypes.TEXT,
  author: DataTypes.STRING(36),
  categoryId: DataTypes.INTEGER,
  body: DataTypes.TEXT,
  createdAt: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Post'
});

export default Post;
