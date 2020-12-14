const api = require('./api')

async function getRepositories(username) {
  const shouldUseMock = false
  const totalRepos = []
  const mockRepos = [
    [
      {
        homepage: "https://github.com",
        name: 'github'
      }
    ],
    [
      {
        homepage: "https://facebook.com",
        name: 'facebook'
      },
      {
        name: 'twitter'
      }
    ],
    []
  ]

  try {
    console.log(`> Tentando pegar os repositórios de ${username}`)

    let page = 1

    while (true) {
      let repos;
      if (shouldUseMock) {
        const url = `/users/${username}/repos?type=all&per_page=100&page=${page}`
        const response = await api.get(url)
        repos = response.data
      } else {
        repos = mockRepos[page - 1]
        if (username == 'a') throw { response: { status: 404 } }
      }

      if (repos.length === 0) break

      totalRepos.push(...repos)
      console.log(`\t> Página ${page} ok!`)
      console.log(`\t> Repositórios até agora: ${totalRepos.length}`)
      page++
    }

    console.log(`> Total de repositórios encontrados: ${totalRepos.length}:`)

    return totalRepos

  } catch (e) {
    if (e.response && e.response.status == 404) {
      throw { message: `Usuário ${username} não encontrado!`, code: 404 }
    } else {
      throw { message: 'Erro inesperado, tente novamente mais tarde!', code: 500 }
    }
  }
}

module.exports = async function getRepositoriesWithHomepage(username) {
  try {
    const repos = await getRepositories(username)

    return repos
      .map(repo => ({
        name: repo.name,
        homepage: repo.homepage
      }))
      .filter(repo => repo.homepage)

  } catch (e) {
    throw e
  }
}
