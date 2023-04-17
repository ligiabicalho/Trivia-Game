# :sparkles: Projeto Trivia Game :brain: :alarm_clock:

Essa aplicação é um jogo de perguntas e respostas baseado no jogo **Trivia** _(tipo um show do milhão americano rs)_ utilizando _React e Redux_. 

Foi desenvolvido em grupo, utilizando metodologias ágeis (scrum e kanban), como desafio do módulo de front-end da [Trybe](https://betrybe.com).  

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
  - [Contexto](#man_technologist-contexto)
  - [Prazo de realização](#prazo-de-realização)
  - [Funcionalidades](#funcionalidades)
  - [Demo](#demo)
- [Tecnologias utilizadas](#tecnologias-utilizadas)  
  - [Front-end](#front-end)  
  - [Testes](#testes)  
- [APIs](#gear-apis)
- [Instalação](#instalando-o-projeto-localmente)
  - [Executando testes](#executando-os-testes-de-cobertura)
- [Requisitos do projeto](#requisitos-do-projeto)
- [Status de desenvolvimento](#status-de-desenvolvimento)
  - [Desafios de desenvolvimento](#desafios-de-desenvolvimento)
- [Desenvolvedores](#desenvolvedores)
- [Agradecimentos](#agradecimentos)


<br/>

# Sobre o projeto

## :man_technologist: Contexto  

O projeto foi desenvolvido em grupo e nosso desafio foi desenvolver a interface em React js de um jogo de perguntas e respostas, implementando diversas [funcionalidades](#funcionalidades) que exigiram habilidades com ciclo de vida de componentes, além do gerenciamento de estado da aplicação com Redux, sendo necessário criar: _store_, _reducers_, _actions_ síncronas e assíncronas, _dispatchers_ e conectar o Redux aos componentes React.

A base de dados é da [API do Trivia](), mas também consumimos a [API Gravatar]() para resgatar, quando possível, a foto do usuário logado.

Além disso, também implementamos testes para garantir uma boa cobertura da aplicação.

Para o bom andamento do trabalho em equipe, utilizamos um quadro Kanban no Trello, além de utilizar o Slack para comunicação síncrona e assíncrona.

## Período de realização

A sprint foi de 4 dias dedicados, em nov/2022.

## Funcionalidades

  - Logar no jogo e, se o email tiver cadastro no site <a href="https://pt.gravatar.com/" target="_blank">Gravatar</a>, a foto será associada ao perfil da pessoa usuária.
  - Página referente ao jogo, onde se deverá escolher uma resposta para cada uma das perguntas apresentadas. 
  - A resposta deve ser marcada antes do timer de 30s chegar a zero, caso contrário a resposta é ser considerada errada.
  - Após 5 perguntas respondidas, a pessoa usuária é direcionada para a tela de score, onde o texto mostrado depende do número de acertos.
  - O score é contabilizado não só com a quantidade de acertos, mas também o tempo gasto para responder a pergunta.
  - Visualizar a página de ranking, se quiser, ao final de cada jogo.
  - Configurar algumas opções para o jogo em uma tela de configuração acessível a partir do cabeçalho do app. (A implementar)

## Demo
> *Screenshot em breve*

Sugestão de uso opcional para estilização: 
<a href="https://www.figma.com/file/59PXrUUfqaRT9P3oDsKVDS/%5BProjeto%5D%5BFrontend%5D-Trivia?node-id=0-1&t=5MqtPZQBFN8dWIiB-0" target="_blank">Protótipo no Figma</a>

Deploy: <a href="https://trivia-game-ligiabicalho.vercel.app/" target="_blank">https://trivia-game-ligiabicalho.vercel.app/</a>

<p align="right"><a href="#sparkles-projeto-trivia-game">(De volta ao topo)</a></p>

## Tecnologias utilizadas

### Front-end
- HTML
- CSS
- JavaScript
- React
- Redux

### Testes
- Jest
- React Testing Library

<p align="right"><a href="#sparkles-projeto-trivia-game">(De volta ao topo)</a></p>

## :gear: APIs

As requisições foram feitas  utilizando apenas o `fetch`, orientação dada para evitar conflitos com a avaliação dos requisitos.

<details><summary><b>:game_die: Trivia API</b></summary>

  A <a href="https://opentdb.com/api_config.php">API do Trivia</a> é um banco de dados aberto e funciona de forma bem simples.  
  Utilizamos 2 endpoints:

  1. Pegar o token de sessão da pessoa que está jogando, fazendo uma requisição para:  
   `https://opentdb.com/api_token.php?command=request`  
  O retorno é um `token` que deve ser utilizado nas requisições seguintes
      ```json
      {
        "response_code":0,
        "response_message":"Token Generated Successfully!",
        "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
      }
      ```

  2. Pegar perguntas e respostas, utilizando o token gerado  
      ```javascript
        https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}
      ```
      :warning: O token expira em 6 horas e retornará um `response_code: 3` caso esteja expirado.

      - <details><summary><b>Possibilidades de resposta:</b></summary>

        ```json
        // Pergunta de múltipla escolha
        {
          "response_code":0,
          "results":[
              {
                "category":"Entertainment: Video Games",
                "type":"multiple",
                "difficulty":"easy",
                "question":"What is the first weapon you acquire in Half-Life?",
                "correct_answer":"A crowbar",
                "incorrect_answers":[
                    "A pistol",
                    "The H.E.V suit",
                    "Your fists"
                ]
              }
          ]
        }
        ```

        ```json
        // Pergunta de verdadeiro ou falso
        {
          "response_code":0,
          "results":[
              {
                "category":"Entertainment: Video Games",
                "type":"boolean",
                "difficulty":"hard",
                "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
                "correct_answer":"False",
                "incorrect_answers":[
                    "True"
                ]
              }
          ]
        }
        ```

        ```json
        // Token expirado
        {
          "response_code":3,
          "results":[]
        }
        ```
      
      </details>

</details>

<details><summary><b>:bust_in_silhouette: Gravatar</b></summary>

  O Gravatar é um serviço que permite deixar o avatar global a partir do email cadastrado, ele mostra sua foto cadastrada em qualquer site vinculado. 
  
  Na tela de **Login**, a pessoa que joga pode colocar um e-mail que deve fazer uma consulta a API do [Gravatar](https://br.gravatar.com/site/implement/images/).

  A implementação é feita baseada no e-mail. Esse email 
  <a href="https://br.gravatar.com/site/implement/hash/" target="_blank">deve ser transformado em uma hash</a>  `MD5`.   
  Para gerar tal hash, utilizamos o [CryptoJs](https://github.com/brix/crypto-js).

  Após a geração da hash, basta adicionar o valor gerado no final da URL:

  ```javascript
  // Formato de URL necessário:
  https://www.gravatar.com/avatar/${hash-gerada}
  ```

  <details><summary><b>Exemplo de imagem exibida</b></summary>
    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="gravatar-img"/>
  </details>
  
</details>

<p align="right"><a href="#sparkles-projeto-trivia-game">(De volta ao topo)</a></p>

## Instalando o projeto localmente

Caso deseje instalar o projeto localmente, siga os seguintes passos:

1. Clone o repositório  
`git clone git@github.com:ligiabicalho/Trivia-Game.git`
2. Entre na pasta do projeto  
`cd Trivia-Game`
3. Instale as dependências  
`npm install`
4. Inicie o servidor local  
`npm start`

- ### Executando os testes de cobertura
É possível verificar o percentual da cobertura de testes que desenvolvemos com o comando:  
`npm run test-coverage`

<p align="right"><a href="#sparkles-projeto-trivia-game">(De volta ao topo)</a></p>


## Requisitos do projeto
> *Clique na seta para ver a lista de requisitos que recebemos para desenvolver durante o processo avaliativo.*

Utilizamos o quadro Kanban no Trello para acompanhar o andamento do trabalho em equipe.

<details>
  <summary><strong>Tela de Login</strong></summary>

  1. Crie a tela de login, onde a pessoa que joga deve preencher nome e e-mail para iniciar um jogo.
  2. Crie o botão "Play" de iniciar o jogo.
  3. Crie um botão "Settings" na tela inicial que leve para a tela de configurações.
  4. Desenvolva testes para atingir 90% de cobertura da tela de Login.
</details>

<details>
  <summary><strong>Tela de Jogo</strong></summary> 

  5. Crie um _header_ que deve conter as informações da pessoa jogadora.
  6. Crie a página de jogo que deve conter as informações relacionadas à pergunta.
  7. Desenvolva o estilo que, ao clicar em uma resposta, a correta deve ficar verde e as incorretas, vermelhas.
  8. Desenvolva um timer onde a pessoa que joga tem 30 segundos para responder.
  9. Crie o placar com as seguintes características:
      - sddsfd
  10. Crie um botão de "Next" que apareça após a resposta ser dada.
  11. Desenvolva o jogo de forma que a pessoa que joga deve responder 5 perguntas no total.
  21. (Bônus) Desenvolva testes para atingir 90% de cobertura da tela de Jogo.
</details>

<details>
  <summary><strong>Tela de Feedback</strong></summary> 

  12. Desenvolva o header de _feedback_ que deve conter as informações da pessoa jogadora.
  13. Crie a mensagem de _feedback_ para ser exibida a pessoa usuária.
  14. Exiba as informações relacionadas aos resultados obtidos para a pessoa usuária.
  15. Crie a opção para a pessoa jogadora poder jogar novamente.
  16. Crie a opção para a pessoa jogadora poder visualizar a tela de _ranking_.
  17. Desenvolva testes para atingir 90% de cobertura da tela de Feedbacks.
</details>

<details>
  <summary><strong>Tela de Ranking</strong></summary> 

  18. Crie um botão para ir ao início.
  19. Crie o conteúdo da tela de _ranking_.
  20. Desenvolva testes para atingir 90% de cobertura da tela de Rankings.
</details>

<details>
  <summary><strong>Tela Settings</strong></summary>

  > Não foi disponibilizado requisitos avaliativos para tela de Settings.

  No entanto, pode-se explorar os dados fornecidos pela API Trivia para, por exemplo, escolher quantidade, categorias, nível de dificuldade dentre outras possibilidades em relação as perguntas.
</details>

<p align="right"><a href="#sparkles-projeto-trivia-game">(De volta ao topo)</a></p>

## Status de desenvolvimento

O projeto foi entregue com 100% das funcionalidades avaliativas. 
No entanto, pode-se ainda implementar a Tela de Settings, gerando maior personalização do jogo.

### Desafios de desenvolvimento
> Em breve

<br>

## Desenvolvedores

<a href="https://github.com/ligiabicalho/Trivia-Game/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ligiabicalho/Trivia-Game" />
</a>

<subscribe>Made with [contrib.rocks](https://contrib.rocks).</subscribe>

## Agradecimentos

Agradeço à Trybe por nos proporcionar esta oportunidade de aprendizado e desenvolvimento de habilidades técnicas e de trabalho em equipe. 
Também agradeço aos colegas da equipe pelas trocas, aos instrutores e mentores que nos apoiaram e orientaram durante o projeto.

<p align="right"><a href="#sparkles-projeto-trivia-game">(De volta ao topo)</a></p>