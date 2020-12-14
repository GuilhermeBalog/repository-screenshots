# Repository Screenshots

📸 Tire screenshots de todos os seus projetos web automaticamente!

![Gif de exemplo](https://github.com/GuilhermeBalog/repository-screenshots/blob/main/demo.gif)

Você pode usar as imagens no README do seu projeto, ou como thumbnail no Github, ou ainda para ilustrar seu portfólio!

O tamanho das imagens geradas é 1200x600, que é o tamanho recomendado para as OG Images do facebook, e também outros serviços.

## Como utilizar?

Você vai precisar do [git](https://git-scm.com/), do [Node.js](https://nodejs.org/en/) instalado e, se quiser o [Yarn](https://yarnpkg.com/)

- Primeiro clone o repositório e entre na pasta criada

    ```bash
    git clone https://github.com/GuilhermeBalog/repository-screenshots.git
    cd repository-screenshots
    ```

- Instale as dependências

    ```bash
    npm install
    # ou
    yarn install
    ```

- Rode o projeto!

    ```bash
    npm start
    #ou
    yarn start
    ```

No terminal será perguntado seu nome de usuário e assim que o programa conseguir listar todos os seus repositórios e fazer o processo, as fotos tiradas ficarão salvas na pasta `screenshots`.

> ⚠️ **IMPORTANTE:** Para o programa conseguir acessar a página de um projeto é necessário informar a url da home page pela site do github:

![Como adicionar homepage](https://github.com/GuilhermeBalog/repository-screenshots/blob/main/add-homepage.gif)

## Como funciona o código?

O nome de usuário é capturado através da biblioteca `readline-sync`, que serve para ler inputs do usuário via terminal. Uma vez que sabemos o nome de usuário, podemos fazer uma requisição para a API do github, com o objetivo de obter todos os repositórios do usuário.

Para isso usamos a biblioteca axios para fazer requisições do tipo GET para `/users/{username}/repos?type=all&per_page=100&page=${page}`, cada vez em uma página nova (aumentando o valor de page), até que a resposta seja um array vazio. O parâmetro `type` com o valor `all` serve para obtermos também os repositórios em que o usuário contribuiu, não apenas os quais ele é dono. Se não for possível achar o usuário fornecido, outro username é solicitado.

Após obter todos os repositórios do usuário, é feita uma filtragem para ficarmos apenas com os repositórios que possuem uma `homepage`.

Agora é hora de tirar as screenshots, usando a biblioteca puppeteer, que simula um navegador debaixo dos panos. Com isso podemos acessar qualquer site da internet, em especial nosso conjunto de URLs de homepage. Então basta acessarmos cada página e utilizar o método `page.screenshot()` passando o caminho para salvar a imagem, no caso utilizamos o nome do repositório.

Com isso o programa termina sua execução e podemos utilizar as imagens geradas!
