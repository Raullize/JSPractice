const { execSync } = require('child_process');

console.log('Iniciando setup da API Agregadora de Contas Bancárias...');

try {
  // Instalar dependências
  console.log('\n📦 Instalando dependências...');
  execSync('npm install', { stdio: 'inherit' });

  // Criar o banco de dados
  console.log('\n🗄️ Criando o banco de dados...');
  execSync('npx sequelize-cli db:create', { stdio: 'inherit' });

  // Gerar migrações
  console.log('\n📝 Gerando migrações...');
  execSync('node generate-migrations.js', { stdio: 'inherit' });

  // Executar migrações
  console.log('\n🔄 Executando migrações...');
  execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });

  console.log('\n✅ Setup concluído com sucesso!');
  console.log('\nVocê pode iniciar o servidor com o comando:');
  console.log('npm run dev');
} catch (error) {
  console.error('\n❌ Erro durante o setup:', error.message);
  console.log('\nVerifique se o PostgreSQL está instalado e em execução.');
  process.exit(1);
} 