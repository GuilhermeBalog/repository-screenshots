const readlineSync = require('readline-sync')

const { Screenshot } = require('./screenshot')
const { getCommands } = require('./commands')

async function main() {
  const welcomeMessage = 'Bem vindo ao repository-screenshots!'
  console.log('\n' + '='.repeat(welcomeMessage.length + 2))
  console.log(` ${welcomeMessage} `)
  console.log('='.repeat(welcomeMessage.length + 2) + '\n')

  await Screenshot.init()
  const commands = getCommands({
    screenshotInstance: Screenshot,
    readline: readlineSync
  })
  const options = commands.map(command => command.message)

  do {
    const selectedIndex = readlineSync.keyInSelect(options, 'Que tipo de screenshot você quer?')

    if(selectedIndex < 0) {
      console.log('Nenhuma opção selecionada. Até mais!')
      break
    }

    await commands[selectedIndex].action()
  } while (readlineSync.keyInYN('Deseja tirar mais screenshots?'))

  console.log('Muito obrigado por utilizar repository-screenshots!')
  await Screenshot.finish()
}

main()
