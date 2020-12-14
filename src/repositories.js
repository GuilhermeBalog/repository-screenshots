const api = require('./api')

async function getRepositories(username) {
  console.log(`> Pegando os repositórios de ${username}`);
  const response = await api.get(`/users/${username}/repos`)
  const repos = response.data

  return repos
}

module.exports = async function getRepositoriesWithHomepage(username) {
  const repos = await getRepositories(username)

  return repos
    .map(repo => ({
      name: repo.name,
      homepage: repo.homepage
    }))
    .filter(repo => repo.homepage)
}
