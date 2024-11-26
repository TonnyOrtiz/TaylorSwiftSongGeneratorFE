import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Comment extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'author',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  }
}
Comment.init({
  comment: DataTypes.STRING(512),
  postId: DataTypes.INTEGER,
  author: DataTypes.STRING(36),
  createdAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Comment',
});

export default Comment;
