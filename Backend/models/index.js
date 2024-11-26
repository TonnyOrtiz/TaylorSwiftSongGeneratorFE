import User from './user.js';
import Post from './post.js';
import Comment from './comment.js';
import Category from './category.js';
import Generate from './generate.js';

const models = {
  User,
  Post,
  Comment,
  Category,
  Generate
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;
