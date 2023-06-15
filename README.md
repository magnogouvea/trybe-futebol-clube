Trybe Futebol Club
A aplicação Trybe Futebol Club é um website completo que permite aos usuários ler informações sobre times e partidas de futebol. Além disso, usuários autenticados têm a possibilidade de criar, atualizar e remover times e partidas. Com base no desempenho dos times, uma tabela de classificação é gerada seguindo critérios predefinidos.

O desenvolvimento do back-end teve como objetivo consolidar conhecimentos em TypeScript, Programação Orientada a Objetos (POO) e princípios SOLID. Foi utilizado o framework Express, seguindo os princípios REST e a arquitetura MSC (Model, Service, Controller).

O front-end foi desenvolvido pela Trybe com o propósito de exibir as informações processadas pelo back-end, juntamente com os arquivos de orquestração do Docker, exceto pelos Dockerfiles, que foram criados por mim.

⚠️ É recomendado o uso do Docker para executar a aplicação.

⚠️ A autenticação do usuário é realizada por meio do localStorage do navegador.

Início Rápido
Usando o Docker

⚠️ É possível alterar as variáveis de ambiente relacionadas aos containers no diretório /trybe-futebol-club/app/docker-compose.yml

⚠️ O comando npm run compose:up deve ser executado na raiz do projeto!

Clone o repositório e acesse a pasta raiz do projeto:
bash
Copy code
git clone git@github.com:pennaor/trybe-futebol-club.git
cd trybe-futebol-club
Inicie os containers:
arduino
Copy code
npm run compose:up
Sem o Docker

⚠️ O MySQL deve estar em execução para o correto funcionamento da aplicação.

⚠️ É necessário utilizar a versão 16 LTS do Node.

⚠️ É possível alterar as variáveis de ambiente criando um arquivo .env nos respectivos diretórios dos segmentos da aplicação, de acordo com o arquivo .env.example de cada segmento:

/trybe-futebol-club/app/frontend/.env
/trybe-futebol-club/app/backend/.env
Clone o repositório e acesse a pasta raiz do projeto:
bash
Copy code
git clone git@github.com:pennaor/trybe-futebol-club.git
cd trybe-futebol-club
Instale as dependências do front-end e do back-end:
arduino
Copy code
npm run postinstall
Inicie o servidor back-end:
bash
Copy code
cd app/backend
npm start
Em outro terminal, inicie o servidor front-end:
bash
Copy code
cd app/frontend
npm start
Funcionalidades
Buscar clubes cadastrados
Buscar partidas em andamento e partidas finalizadas
Autenticar usuários cadastrados através do login
Cadastrar partidas em andamento e atualizar o placar conforme necessário
Finalizar partidas em andamento
Criar tabela de classificação dos times, ordenada de acordo com o desempenho calculado com base em critérios avaliativos previamente estabelecidos para as modalidades: home, away, all.
Testes
O back-end possui testes de integração desenvolvidos seguindo o princípio do Desenvolvimento Orientado por Testes (Test Driven Development - TDD) e utilizando as bibliotecas Mocha, Chai e Sinon.

Os testes podem ser executados com o comando npm test no diretório do back-end.

⚠️ Utilizando o Docker, é necessário executar o comando dentro do container do back-end!

Ferramentas
Front-end:

ReactJS
Axios
Back-end:

TypeScript
ExpressJS
Sequelize
JSON Web Token
Joi
Mocha
Chai
Sinon
Geral:

Docker
Eslint
Trybe
Os seguintes elementos foram totalmente desenvolvidos pela Trybe:

Front-end
Docker-compose
Regras de Lint
Scripts do npm
