# 🏠 DevHouse API

API desenvolvida para o projeto DevHouse, utilizando Node.js com Express e MongoDB.

## 📋 Sobre o Projeto

O DevHouse é uma API RESTful desenvolvida para gerenciamento de imóveis e reservas. A aplicação permite cadastro de casas, gerenciamento de reservas e autenticação de usuários.

### 🌟 Características

- ✅ Arquitetura MVC (Model-View-Controller)
- ✅ Persistência de dados com MongoDB
- ✅ Upload de imagens com Multer
- ✅ Validação de dados com Yup
- ✅ Autenticação de usuários
- ✅ CORS configurado para requisições cross-origin
- ✅ Tratamento de erros
- ✅ Documentação completa da API

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **Mongoose** - ODM (Object Document Mapper) para MongoDB
- **CORS** - Middleware para permitir requisições cross-origin
- **Multer** - Middleware para upload de arquivos
- **Yup** - Biblioteca para validação de dados
- **Nodemon** - Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento
- **Sucrase** - Compilador que permite usar sintaxe moderna do JavaScript

## 📁 Arquitetura MVC

O projeto utiliza a arquitetura MVC (Model-View-Controller), um padrão de design que separa a aplicação em três componentes principais:

- **Model (Modelo)**: Representa a estrutura de dados e a lógica de negócios. Gerencia os dados, regras e funções da aplicação.
- **View (Visualização)**: Em APIs REST, a View é representada pelos dados retornados em formato JSON.
- **Controller (Controlador)**: Gerencia as requisições HTTP, processa os dados e retorna as respostas apropriadas.

Esta arquitetura proporciona:
- Separação clara de responsabilidades
- Código mais organizado e manutenível
- Facilidade para testar componentes isoladamente
- Melhor escalabilidade do projeto

## 📂 Estrutura Detalhada do Projeto

```
src/
├── app.js              # Configuração principal do Express
├── server.js           # Ponto de entrada da aplicação
├── routes.js           # Definição das rotas da API
├── config/             # Configurações da aplicação
│   └── upload.js       # Configuração do Multer para uploads
├── controllers/        # Controladores da aplicação
│   ├── HouseController.js     # Lógica para gerenciamento de casas
│   ├── ReserveController.js   # Lógica para reservas
│   ├── SessionController.js   # Lógica para autenticação
│   └── DashboardController.js # Lógica para dashboard
├── models/             # Modelos do MongoDB
│   ├── House.js        # Modelo de casas
│   ├── Reserve.js      # Modelo de reservas
│   └── User.js         # Modelo de usuários
└── uploads/            # Diretório para armazenamento de arquivos
```

## 🔌 Conexão com MongoDB

A aplicação utiliza o MongoDB Atlas (plano gratuito). A string de conexão está configurada no arquivo `src/app.js`:

```javascript
mongoose.connect('mongodb+srv://<seu_usuario>:<sua_senha>@<seu_cluster>.mongodb.net/devHouse?retryWrites=true&w=majority&appName=devHouse');
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 12 ou superior)
- npm ou yarn
- MongoDB Atlas (conta gratuita)

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd <nome-da-pasta>
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor em modo de desenvolvimento:
```bash
npm run dev
```

O servidor será iniciado na porta 3000 por padrão. Você verá a mensagem `Servidor rodando na porta 3000` no console.

## 📡 Testando a API

### Postman/Insomnia

Para testar a API, você pode usar o Postman ou Insomnia. Ambas são ferramentas gráficas que facilitam o teste de APIs. Algumas considerações importantes:

1. A API roda por padrão na porta 3000
2. URLs base:
   - Local: `http://localhost:3000`
   - Produção: `[URL_DO_SERVIDOR]:3000`

#### Exemplos de Requisições

##### Criar uma nova casa
1. Método: `POST`
2. URL: `http://localhost:3000/api/houses`
3. Headers:
   ```
   Content-Type: application/json
   ```
4. Body (raw JSON):
   ```json
   {
     "title": "Casa na Praia",
     "description": "Casa com vista para o mar",
     "price": 1500,
     "location": "Praia Grande"
   }
   ```

##### Fazer login
1. Método: `POST`
2. URL: `http://localhost:3000/api/session`
3. Headers:
   ```
   Content-Type: application/json
   ```
4. Body (raw JSON):
   ```json
   {
     "email": "usuario@exemplo.com",
     "password": "senha123"
   }
   ```

##### Upload de imagem
1. Método: `POST`
2. URL: `http://localhost:3000/api/houses/:id/upload`
3. Headers:
   ```
   Content-Type: multipart/form-data
   ```
4. Body (form-data):
   - Chave: `file`
   - Valor: Selecione um arquivo de imagem

#### Dicas para Postman/Insomnia
- Salve suas requisições em coleções para reutilização
- Use variáveis de ambiente para URLs base
- Configure autenticação quando necessário
- Use o modo "Preview" para visualizar imagens retornadas
- Exporte suas coleções para compartilhar com a equipe

### Exemplos com cURL

O cURL é uma ferramenta de linha de comando que permite fazer requisições HTTP diretamente do terminal. É útil para:
- Testes rápidos da API
- Automação de testes
- Integração com scripts
- Verificação de endpoints em ambientes sem interface gráfica

Para usar os exemplos abaixo, você precisa ter o cURL instalado no seu sistema. No Windows, você pode usar o PowerShell ou o Git Bash.

#### Criar uma nova casa:
```bash
curl -X POST http://localhost:3000/api/houses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Casa na Praia",
    "description": "Casa com vista para o mar",
    "price": 1500,
    "location": "Praia Grande"
  }'
```

#### Fazer login:
```bash
curl -X POST http://localhost:3000/api/session \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }'
```

Onde:
- `-X POST`: Define o método HTTP como POST
- `-H`: Adiciona um cabeçalho HTTP (neste caso, Content-Type)
- `-d`: Define o corpo da requisição (dados)

## 🔒 Middlewares e Configurações

- **CORS**: Habilitado para permitir requisições de diferentes origens
- **JSON Parser**: Configurado para processar requisições JSON
- **Uploads**: Configurado para servir arquivos estáticos da pasta `uploads`
- **Validação**: Utiliza Yup para validação de dados

## 📦 Dependências Principais

- **express**: Framework web para Node.js
- **mongoose**: ODM para MongoDB
- **cors**: Middleware para CORS
- **multer**: Middleware para upload de arquivos
- **yup**: Biblioteca para validação de dados

## ⚠️ Observações Importantes

1. Mantenha suas credenciais do MongoDB seguras
2. Ao fazer upload de arquivos, certifique-se de que o diretório `uploads` existe
3. Em ambiente de produção, configure variáveis de ambiente para dados sensíveis
4. Ajuste as configurações do CORS conforme necessário para seu ambiente