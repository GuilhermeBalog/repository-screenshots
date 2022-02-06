const puppeteer = require('puppeteer-core')
const { join } = require('path')
const { existsSync } = require('fs')
const executablePath = require('./chromePath')

const screenshotsPath = join(process.cwd(), 'screenshots')

const Screenshot = {
  browser: null,
  page: null,
  httpRegex: /^https?:\/\//gi,

  async init() {
    console.log('Iniciando o browser...')
    this.browser = await puppeteer.launch({ executablePath, headless: true })
    console.log('Abrindo página...')
    this.page = await this.browser.newPage()
    console.log('Definindo viewport...')
    await this.page.setViewport({ width: 1280, height: 640 })
  },

  async finish() {
    if (this.browser) {
      this.browser.close()
    }
  },

  async getReposScreenshot(repos) {
    for (let i = 0; i < repos.length; i++) {
      await this.getScreenshot(repos[i].homepage)
    }
  },

  async getScreenshot(url) {
    try {
      const path = join(screenshotsPath, `${this.urlToFileName(url)}.png`)
      if (existsSync(path)) {
        console.log(`Pulando pois screenshot para ${url} já existe`)
        return
      }

      if(!this.httpRegex.test(url)){
        console.log('Adicionando http:// ao início da URL')
        url = `http://${url}`
      }

      await this.page.goto(url)
      await this.page.screenshot({ path })
      console.log(`Screenshot de ${url} salva em ${path}`)

    } catch (e) {
      console.log(`Erro ao tirar screenshot para ${url}:`)
      console.log(`\t> ${e.message}\n`)
    }
  },

  urlToFileName(url) {
    return `${url.replace(this.httpRegex, '').replace(/\//g, '_')}`
  }
}

module.exports = { Screenshot }
