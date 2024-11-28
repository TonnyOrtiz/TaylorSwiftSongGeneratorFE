import Generate from './generate.js';

const handlers = {
  Generate
};

Object.keys(handlers).forEach(repoName => {
  if (handlers[repoName].associate) {
    handlers[repoName].associate(handlers);
  }
});

export default handlers;
