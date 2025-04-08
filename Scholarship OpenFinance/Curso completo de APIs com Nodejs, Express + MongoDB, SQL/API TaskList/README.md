# 🚀 API TaskList - Node.js & Express

## 📋 Sobre o Projeto

Esta é uma API RESTful desenvolvida em Node.js com Express.js. O projeto implementa uma API para gerenciamento de tarefas com autenticação JWT, utilizando PostgreSQL como banco de dados e seguindo as melhores práticas de desenvolvimento.

### 🌟 Características

- ✅ Autenticação JWT
- ✅ Banco de dados PostgreSQL com Sequelize
- ✅ Validação de dados com Yup
- ✅ CORS habilitado
- ✅ Criptografia de senhas com bcryptjs
- ✅ ESLint e Prettier para padronização de código

## 🛠️ Tecnologias Utilizadas

### Dependências Principais

- **express**: Framework web rápido e minimalista para Node.js
- **bcryptjs**: Biblioteca para hash de senhas
- **jsonwebtoken**: Implementação de JSON Web Tokens (JWT)
- **yup**: Biblioteca de validação de esquemas
- **sequelize**: ORM para Node.js, suportando PostgreSQL e outros bancos
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing)
- **pg & pg-hstore**: Drivers PostgreSQL para Node.js

### Dependências de Desenvolvimento

- **nodemon**: Monitora alterações e reinicia automaticamente o servidor
- **sucrase**: Permite usar sintaxe import/export do ES6
- **eslint**: Ferramenta de linting para identificar problemas no código
- **prettier**: Formatador de código
- **sequelize-cli**: CLI para gerenciar migrações do Sequelize
- **eslint-config-airbnb-base**: Configuração do ESLint baseada no style guide do Airbnb
- **eslint-config-prettier**: Integração do ESLint com Prettier
- **eslint-plugin-import**: Suporte a imports/exports no ESLint
- **eslint-plugin-prettier**: Executa o Prettier como regra do ESLint

## 🔐 Autenticação JWT

JSON Web Token (JWT) é um padrão para autenticação e troca de informações. Um token JWT consiste em três partes:

1. **Header**: Contém o tipo do token e o algoritmo de criptografia
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

2. **Payload**: Contém as informações do usuário (claims)
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

3. **Assinatura**: Garante a integridade do token
   - Criada usando o header codificado, payload codificado e uma chave secreta
   - Usada para verificar se o token não foi alterado

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 12 ou superior)
- PostgreSQL
- npm ou yarn

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

3. Configure o banco de dados no arquivo `src/config/database.js`

4. Execute as migrações:
```bash
npx sequelize db:migrate
```

### Comandos Disponíveis

- **Desenvolvimento**:
```bash
npm run dev
```

- **Formatação de código**:
```bash
npm run format
```

- **Verificação de lint**:
```bash
npm run lint
```

## 📦 Migrações do Banco de Dados

O comando `npx sequelize db:migrate` executa todas as migrações pendentes, criando ou atualizando as tabelas no banco de dados. Outros comandos úteis:

- `npx sequelize migration:create --name=create-users`: Cria um novo arquivo de migração
- `npx sequelize db:migrate:undo`: Reverte a última migração
- `npx sequelize db:migrate:undo:all`: Reverte todas as migrações

## 💅 Padronização de Código

O projeto utiliza ESLint e Prettier para garantir a qualidade e consistência do código:

- **npm run lint**: Verifica e corrige problemas de estilo de código usando ESLint
- **npm run format**: Formata automaticamente o código usando Prettier

As configurações seguem o style guide do Airbnb com algumas personalizações para melhor adequação ao projeto.

## 📁 Estrutura do Projeto

```
.
├── src/                          # Diretório principal do código fonte
│   ├── app/                      # Núcleo da aplicação
│   │   ├── controllers/          # Controladores para manipulação das requisições
│   │   ├── middlewares/          # Middlewares para processamento das requisições
│   │   └── models/              # Modelos do Sequelize (definição das tabelas)
│   ├── config/                   # Configurações do projeto
│   │   └── database.js          # Configuração de conexão com o banco de dados
│   ├── database/                 # Arquivos relacionados ao banco de dados
│   │   └── migrations/          # Migrações do Sequelize (estrutura das tabelas)
│   ├── app.js                   # Configuração do Express e middlewares
│   ├── routes.js               # Definição das rotas da API
│   └── server.js               # Inicialização do servidor
├── .eslintrc.js                # Configuração do ESLint
├── .prettierrc                 # Configuração do Prettier
├── .gitignore                  # Arquivos e pastas ignorados pelo Git
├── package.json                # Dependências e scripts do projeto
└── README.md                   # Documentação do projeto
```

## 📡 Endpoints da API

### Autenticação

#### Criar usuário
```http
POST /users
```

**Corpo da requisição:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Exemplo de resposta:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Login
```http
POST /sessions
```

**Corpo da requisição:**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Exemplo de resposta:**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Tasks (requer autenticação)

Para todas as rotas abaixo, é necessário incluir o header:
```
Authorization: Bearer <seu-token>
```

#### Listar todas as tasks
```http
GET /tasks
```

**Exemplo de resposta:**
```json
[
  {
    "id": 1,
    "title": "Estudar Node.js",
    "description": "Completar o módulo de Node.js",
    "completed": false,
    "user_id": 1,
    "created_at": "2024-04-08T10:00:00.000Z",
    "updated_at": "2024-04-08T10:00:00.000Z"
  }
]
```

#### Criar nova task
```http
POST /tasks
```

**Corpo da requisição:**
```json
{
  "title": "Estudar React",
  "description": "Completar o módulo de React"
}
```

**Exemplo de resposta:**
```json
{
  "id": 2,
  "title": "Estudar React",
  "description": "Completar o módulo de React",
  "completed": false,
  "user_id": 1,
  "created_at": "2024-04-08T11:00:00.000Z",
  "updated_at": "2024-04-08T11:00:00.000Z"
}
```

#### Atualizar task
```http
PUT /tasks/:id
```

**Corpo da requisição:**
```json
{
  "title": "Estudar React Atualizado",
  "completed": true
}
```

**Exemplo de resposta:**
```json
{
  "id": 2,
  "title": "Estudar React Atualizado",
  "description": "Completar o módulo de React",
  "completed": true,
  "user_id": 1,
  "created_at": "2024-04-08T11:00:00.000Z",
  "updated_at": "2024-04-08T11:30:00.000Z"
}
```

#### Deletar task
```http
DELETE /tasks/:id
```

**Exemplo de resposta:**
```json
{
  "message": "Task deletada com sucesso"
}
```

## 🧪 Como Testar a API

Você pode testar a API utilizando o Insomnia ou Postman. Aqui está um passo a passo:

1. Primeiro, crie um usuário usando o endpoint POST /users
2. Faça login usando o endpoint POST /sessions
3. Copie o token retornado no login
4. Para todas as requisições subsequentes às tasks, adicione o header:
   ```
   Authorization: Bearer <seu-token>
   ```

### 📱 Testando com Insomnia

1. Importe a coleção de requisições (disponível em `insomnia.json` na raiz do projeto)
2. Configure a variável de ambiente `base_url` para `http://localhost:3000`
3. Execute as requisições na seguinte ordem:
   - Criar usuário
   - Login
   - Criar task
   - Listar tasks
   - Atualizar task
   - Deletar task

### Exemplos com cURL

#### Criar usuário:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456"
  }'
```

#### Login:
```bash
curl -X POST http://localhost:3000/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "123456"
  }'
```

#### Criar task (substitua <token> pelo token recebido no login):
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudar Node.js",
    "description": "Completar o módulo de Node.js"
  }'
``` 