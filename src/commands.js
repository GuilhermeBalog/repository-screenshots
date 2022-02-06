const getRepositoriesWithHomepage = require('./repositories')

function getCommands({ screenshotInstance, readline }) {
  return [{
    message: 'Tirar de todos os meus repositórios do GitHub',
    async action() {
      let username = readline.question('> Digite seu username do Github: ')
      let repos = []

      while (true) {
        try {
          repos = await getRepositoriesWithHomepage(username)
          if (repos.length <= 0) {
            console.log('\nNenhum repositório com homepage encontrado!')
            return
          }
          break

        } catch (e) {
          console.log(`\n${e.message}\n`)

          if (e.code === 404) {
            username = readline.question(`> Usuário ${username} não encontrado. Digite seu username novamente: `)
          } else {
            console.log('Um erro inesperado aconteceu')
            return
          }
        }
      }

      console.log(`> Repositórios com homepage encontrados: ${repos.length}`)
      await screenshotInstance.getReposScreenshot(repos)
    }
  },
  {
    message: 'Tirar de uma url específica',
    async action(){
      let url = readline.question('> Digite a url: ')
      await screenshotInstance.getScreenshot(url)
    }
  }]
}

module.exports = {
  getCommands
}