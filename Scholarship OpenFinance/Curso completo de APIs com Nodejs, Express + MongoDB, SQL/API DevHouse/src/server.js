// Importação do app
const app = require('./app');

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

/**
 * Inicia o servidor na porta especificada
 * Exibe uma mensagem quando o servidor estiver rodando
 */
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});