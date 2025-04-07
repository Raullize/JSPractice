// Importação das dependências
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

// Classe principal da aplicação
class App{

  constructor(){
    // Inicializa o servidor Express
    this.server = express();

    // Conecta ao banco de dados MongoDB
    // Substitua a string de conexão pela sua do MongoDB Atlas
    mongoose.connect('mongodb+srv://devHouse:devHouse@devhouse.swgvp7h.mongodb.net/devHouse?retryWrites=true&w=majority&appName=devHouse');

    // Inicializa os middlewares e rotas
    this.middlewares();
    this.routes();
  }

  // Configuração dos middlewares
  middlewares(){
    // Habilita CORS para permitir requisições de diferentes origens
    this.server.use(cors());

    // Configura o servidor para servir arquivos estáticos da pasta uploads
    // Acessível via http://localhost:3000/files/nome_do_arquivo
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    )

    // Habilita o parse de JSON nas requisições
    this.server.use(express.json());
  }

  // Configuração das rotas
  routes(){
    this.server.use(routes);
  }

}

// Exporta a instância do servidor
module.exports = new App().server;