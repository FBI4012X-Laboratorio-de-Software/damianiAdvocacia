### Instalação do projeto

```bash
# 1. Clonando o repositório
$ git clone https://github.com/FBI4012X-Laboratorio-de-Software/damianiAdvocacia.git

# 2. Acessando o diretório do projeto API que se encontrar no diretório /versao-inicial/backend

# 2.1. Instalando as dependências
$ npm install

# 2.2. Configurando o .ENV
Renomear o arquivo env_file para apenas .env e o configure de acordo com as suas escolhas.

# 2.3. Banco de dados
$ crie o banco de dados no postgres, com nome de 'advocacia'
$ rode o comando no cmd: knex:migrate

# 2.4. Rodando a aplicação em modo desenvolvimento
$ npm start

# 3. Projeto WEB que se encontra no diretório /versao-inicial/frontend

# 3.1. Repita o procedimento 2.1
# 3.2. Rodando a aplicação em modo desenvolvimento
$ npm run serve
```