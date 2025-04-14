# API Agregadora de Contas Bancárias

Uma API REST que permite aos usuários gerenciar suas contas bancárias em diferentes instituições financeiras, visualizar saldos consolidados e histórico de transações.

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JWT para autenticação
- Bcrypt para criptografia de senhas
- Yup para validação de dados
- ESLint e Prettier para padronização de código
- Dotenv para variáveis de ambiente

## Pré-requisitos

Para executar esta API, você precisará:

- [Node.js](https://nodejs.org/) (v12 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (v10 ou superior)
- [npm](https://www.npmjs.com/)

## Configuração e Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd <nome-da-pasta>
```

### 2. Configuração do Ambiente

O projeto utiliza variáveis de ambiente para configuração. Você deve criar um arquivo `.env` na raiz do projeto, seguindo o modelo do arquivo `.env.example`:

```bash
# Copie o arquivo .env.example
cp .env.example .env

# Edite o arquivo .env com suas configurações
```

Exemplo de configuração no arquivo `.env`:

```
# Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=api_contas_bancarias
DB_USER=postgres
DB_PASS=sua_senha
DB_DIALECT=postgres

# Configurações da API
PORT=3000
NODE_ENV=development

# JWT Secret
JWT_SECRET=sua_chave_secreta
JWT_EXPIRATION=7d
```

### 3. Instalação Automática (Recomendada)

O projeto inclui um script de configuração automatizado que facilita a instalação:

```bash
node setup.js
```

Este script realiza as seguintes tarefas:
- Instala todas as dependências
- Cria o banco de dados usando as configurações do arquivo .env
- Executa as migrações para criar as tabelas

### 4. Instalação Manual (Alternativa)

Se preferir configurar manualmente:

```bash
# Instalar dependências
npm install

# Criar o banco de dados
npx sequelize-cli db:create

# Executar migrações
npx sequelize-cli db:migrate
```

## Iniciando o Servidor

```bash
npm run dev
```

O servidor estará disponível em http://localhost:3000

## Estrutura da API

A API é organizada em módulos principais que representam os diferentes recursos disponíveis:

| Categoria     | Rota                                | Método | Requer JWT | Descrição                                        |
|---------------|-------------------------------------|--------|------------|--------------------------------------------------|
| **Auth**      |                                     |        |            |                                                  |
|               | `/sessions`                         | POST   | Não        | Autentica usuário e retorna token JWT            |
|               | `/users`                            | POST   | Não        | Cria um novo usuário                             |
| **Users**     |                                     |        |            |                                                  |
|               | `/users`                            | GET    | Sim        | Lista todos os usuários                          |
|               | `/users/:id`                        | GET    | Sim        | Retorna dados de um usuário específico           |
|               | `/users`                            | PUT    | Sim        | Atualiza dados do usuário autenticado            |
| **BankAccounts** |                                  |        |            |                                                  |
|               | `/accounts`                         | POST   | Sim        | Cria uma nova conta bancária                     |
|               | `/accounts`                         | GET    | Sim        | Lista todas as contas do usuário                 |
|               | `/accounts/:id`                     | GET    | Sim        | Retorna dados de uma conta específica            |
|               | `/accounts/:id`                     | PUT    | Sim        | Atualiza dados de uma conta                      |
|               | `/accounts/:id`                     | DELETE | Sim        | Desativa uma conta (soft delete)                 |
| **Transactions** |                                  |        |            |                                                  |
|               | `/accounts/:account_id/transactions`| POST   | Sim        | Cria uma nova transação                          |
|               | `/accounts/:account_id/transactions`| GET    | Sim        | Lista transações de uma conta específica         |
|               | `/transactions/:id`                 | GET    | Sim        | Retorna dados de uma transação específica        |
| **Financial** |                                     |        |            |                                                  |
|               | `/balance`                          | GET    | Sim        | Retorna balanço financeiro do usuário            |
|               | `/balance?month=M&year=YYYY`        | GET    | Sim        | Retorna balanço financeiro filtrado por período  |

## Testando a API

Você pode testar a API usando ferramentas como [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/) ou [curl](https://curl.se/).

### Autenticação

1. **Criar um usuário**:
   ```
   POST /users
   Content-Type: application/json
   
   {
     "name": "Usuário Teste",
     "email": "usuario@teste.com",
     "cpf": "12345678901",
     "password": "123456"
   }
   ```

2. **Fazer login e obter token**:
   ```
   POST /sessions
   Content-Type: application/json
   
   {
     "email": "usuario@teste.com",
     "password": "123456"
   }
   ```
   Guarde o token JWT retornado para usar nas próximas requisições.

### Usando as Rotas Protegidas

Para todas as rotas protegidas, adicione o header de autorização:
```
Authorization: Bearer seu_token_jwt_aqui
```

### Exemplos de Requisições

#### Listar Usuários
```
GET /users
Authorization: Bearer seu_token_jwt_aqui
```

#### Visualizar Usuário Específico
```
GET /users/1
Authorization: Bearer seu_token_jwt_aqui
```

#### Atualizar Dados do Usuário
```
PUT /users
Content-Type: application/json
Authorization: Bearer seu_token_jwt_aqui

{
  "name": "Nome Atualizado",
  "email": "email_atualizado@teste.com",
  "oldPassword": "123456",
  "password": "654321",
  "confirmPassword": "654321"
}
```

#### Adicionar uma Conta Bancária
```
POST /accounts
Content-Type: application/json
Authorization: Bearer seu_token_jwt_aqui

{
  "bank_name": "Banco do Brasil",
  "agency": "1234",
  "account_number": "123456-7",
  "account_type": "checking",
  "balance": 1000.00
}
```

#### Listar Contas Bancárias
```
GET /accounts
Authorization: Bearer seu_token_jwt_aqui
```

#### Visualizar Conta Específica
```
GET /accounts/1
Authorization: Bearer seu_token_jwt_aqui
```

#### Atualizar Conta Bancária
```
PUT /accounts/1
Content-Type: application/json
Authorization: Bearer seu_token_jwt_aqui

{
  "bank_name": "Banco do Brasil",
  "agency": "4321",
  "account_number": "7654321-0",
  "account_type": "savings",
  "balance": 2000.00
}
```

#### Desativar Conta Bancária
```
DELETE /accounts/1
Authorization: Bearer seu_token_jwt_aqui
```

#### Adicionar uma Transação
```
POST /accounts/1/transactions
Content-Type: application/json
Authorization: Bearer seu_token_jwt_aqui

{
  "description": "Depósito inicial",
  "amount": 500.00,
  "type": "deposit",
  "category": "Salário",
  "transaction_date": "2024-06-24T10:00:00Z"
}
```

#### Listar Transações de uma Conta
```
GET /accounts/1/transactions
Authorization: Bearer seu_token_jwt_aqui
```

#### Visualizar Transação Específica
```
GET /transactions/1
Authorization: Bearer seu_token_jwt_aqui
```

#### Ver Balanço Financeiro
```
GET /balance
Authorization: Bearer seu_token_jwt_aqui
```

#### Ver Balanço Financeiro com Filtro por Mês
```
GET /balance?month=6&year=2024
Authorization: Bearer seu_token_jwt_aqui
```

## Estrutura do Banco de Dados

O sistema usa três tabelas principais:

### Users
Armazena informações dos usuários registrados.

### BankAccounts
Armazena informações das contas bancárias associadas aos usuários.

### Transactions
Registra todas as transações financeiras associadas às contas bancárias.

## Desenvolvimento

### Gerando Novas Migrações

Para adicionar novas tabelas ou modificar as existentes:

```bash
npx sequelize-cli migration:generate --name nome-da-migracao
```

### Lint e Formatação

O projeto usa ESLint e Prettier para padronização de código:

```bash
# Verificar problemas
npm run lint

# Corrigir automaticamente quando possível
npm run lint:fix
```

## Funcionalidades

### Usuários
- Cadastro de novos usuários
- Autenticação com JWT
- Atualização de dados de perfil

### Contas Bancárias
- Cadastro de contas em diferentes bancos
- Listagem de todas as contas do usuário
- Detalhes de uma conta específica
- Atualização de dados da conta
- Desativação de contas

### Transações
- Registro de depósitos, saques e transferências
- Histórico de transações por conta
- Filtros por data, tipo e categoria

### Balanço Financeiro
- Saldo total consolidado
- Análise de receitas e despesas por período
- Categorização de gastos