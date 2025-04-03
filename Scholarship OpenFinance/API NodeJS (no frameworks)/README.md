# 🦸‍♂️ API de Heróis - Node.js sem Frameworks 🦸‍♀️

## 📋 Sobre o Projeto

Esta é uma API RESTful desenvolvida em Node.js **sem o uso de frameworks externos**. O projeto implementa uma API para gerenciamento de heróis utilizando apenas os módulos nativos do Node.js.

### 🌟 Características

- ✅ Implementação vanilla de servidor HTTP
- ✅ Arquitetura em camadas (Repositories, Services, Entities)
- ✅ Padrão Factory para injeção de dependências
- ✅ Persistência em arquivo JSON
- ✅ Tratamento de erros
- ✅ Validação de dados

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 12 ou superior)
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

### Executando a API

Para iniciar o servidor em modo de desenvolvimento (com auto-reload):
```bash
npm run dev
```

Para iniciar o servidor em modo de produção:
```bash
npm start
```

O servidor será iniciado na porta 3000 por padrão. Você verá a mensagem `server running at 3000` no console.

## 📡 Endpoints da API

### Listar todos os heróis
```
GET /heroes
```

**Exemplo de resposta:**
```json
{
  "results": [
    {
      "id": 1,
      "name": "Homem de Ferro",
      "age": 45,
      "power": "Tecnologia Avançada"
    },
    {
      "id": 2,
      "name": "Mulher Maravilha",
      "age": 3000,
      "power": "Força Divina"
    }
  ]
}
```

### Buscar herói por ID
```
GET /heroes/1
```

**Exemplo de resposta:**
```json
{
  "results": {
    "id": 1,
    "name": "Homem de Ferro",
    "age": 45,
    "power": "Tecnologia Avançada"
  }
}
```

### Criar novo herói
```
POST /heroes
```

**Corpo da requisição:**
```json
{
  "name": "Superman",
  "age": 38,
  "power": "Super força"
}
```

**Exemplo de resposta:**
```json
{
  "success": "User Created with success!!",
  "id": 1743627754574
}
```

## 🧪 Como Testar a API

Você pode testar a API utilizando ferramentas como Postman ou Insomnia.

### Exemplos com cURL

#### Listar todos os heróis:
```bash
curl -X GET http://localhost:3000/heroes
```

#### Buscar herói por ID:
```bash
curl -X GET http://localhost:3000/heroes/1
```

#### Criar novo herói:
```bash
curl -X POST http://localhost:3000/heroes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Superman",
    "age": 38,
    "power": "Super força"
  }'
```

### 📱 Testando com Postman/Insomnia

1. Crie uma nova requisição
2. Selecione o método (GET ou POST)
3. Digite a URL completa (ex: http://localhost:3000/heroes)
4. Para POST, no corpo da requisição selecione JSON e adicione o corpo conforme exemplo acima
5. Envie a requisição e verifique a resposta

## 🏗️ Estrutura do Projeto

```
.
├── database/
│   └── data.json         # Arquivo de persistência dos dados
├── src/
│   ├── entities/         # Definição das entidades do domínio
│   │   └── hero.js       # Entidade Hero com validações
│   ├── factories/        # Factories para injeção de dependências
│   │   └── heroFactory.js # Factory para serviço de heróis
│   ├── repositories/     # Camada de acesso a dados
│   │   └── heroRepository.js # Repositório para operações CRUD
│   ├── services/         # Camada de serviços/lógica de negócios
│   │   └── heroService.js # Serviço de heróis
│   └── index.js          # Ponto de entrada da aplicação (servidor HTTP)
├── package.json
└── README.md
```

## 📊 Arquitetura

O projeto segue uma arquitetura em camadas:

1. **Entities**: Definem a estrutura de dados e validações
2. **Repositories**: Responsáveis pelo acesso e manipulação de dados
3. **Services**: Implementam a lógica de negócios
4. **Factories**: Gerenciam a criação e dependências dos serviços
5. **API (index.js)**: Define as rotas e processa as requisições HTTP
