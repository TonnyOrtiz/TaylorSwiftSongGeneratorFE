import TaylorSwift from './taylorSwift.js';

const models = {
  TaylorSwift
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;
