const readlineSync = require('readline-sync');
const getRepositoriesWithHomepage = require('./repositories')
const getScreenshots = require('./screenshot')

console.log('\nBem vindo ao repo-screenshot!\n')

getScreenshotsFromUser()

async function getScreenshotsFromUser() {
  let username = readlineSync.question('> Digite seu username do Github: ')
  let repos = []

  while (true) {
    try {
      repos = await getRepositoriesWithHomepage(username)
      if (repos.length > 0) {
        break
      } else {
        console.log('\nNenhum repositório com homepage encontrado, finalizando!')
        process.exit(0)
      }

    } catch (e) {
      console.log(`\n${e.message}\n`)

      if (e.code === 404) {
        username = readlineSync.question('> Digite seu username do Github novamente: ')
      } else {
        process.exit(1)
      }
    }
  }
  console.log(`> Repositórios com homepage encontrados: ${repos.length}`)
  await getScreenshots(repos)

  console.log('\nFinalizado!')
}
