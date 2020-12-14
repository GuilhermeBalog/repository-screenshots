const puppeteer = require('puppeteer-core')
const path = require('path')
const executablePath = require('./chromePath')

const screenshotsPath = path.join(process.cwd(), 'screenshots')

module.exports = async function getScreenshots(repos) {

  console.log('> Abrindo o browser')
  const browser = await puppeteer.launch({
    executablePath
  })

  console.log('> Criando a página')
  const page = await browser.newPage()

  console.log('> Definindo o viewport');
  await page.setViewport({ width: 1200, height: 600 })

  for (let i = 0; i < repos.length; i++) {
    await getScreenshot(repos[i], page)
  }

  console.log('> Fechando o browser')
  await browser.close()
}

async function getScreenshot(repo, page) {
  try {
    console.log(`> Abrindo ${repo.homepage}`)
    await page.goto(repo.homepage)

    console.log(`> Tirando screenshot para o repositório ${repo.name}`)
    await page.screenshot({
      path: path.join(screenshotsPath, `${repo.name}.png`)
    })
  } catch (e) {
    throw { message: 'Erro ao tirar screenshot para ' + repo.name }
  }
}
