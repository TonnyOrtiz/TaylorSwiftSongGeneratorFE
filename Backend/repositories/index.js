import Generate from './generate.js';

const repositories = {
  Generate
};

Object.keys(repositories).forEach(repoName => {
  if (repositories[repoName].associate) {
    repositories[repoName].associate(repositories);
  }
});

export default repositories;
