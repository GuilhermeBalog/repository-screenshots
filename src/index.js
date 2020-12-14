const readlineSync = require('readline-sync');
const getRepositoriesWithHomepage = require('./repositories')
const getScreenshots = require('./screenshot')

console.log('\nBem vindo ao repo-screenshot!')

const username = readlineSync.question('Digite seu username do Github: ')

getScreenshotsFromUser(username)

async function getScreenshotsFromUser(username) {
  const repos = await getRepositoriesWithHomepage(username)
  await getScreenshots(repos)

  console.log('Finalizado!')
}
