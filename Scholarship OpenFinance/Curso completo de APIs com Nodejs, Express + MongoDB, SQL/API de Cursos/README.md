# 🎓 API de Cursos - Express.js 📚

## 📋 Sobre o Projeto

Esta é uma API RESTful desenvolvida em Node.js com Express.js. O projeto implementa uma API para gerenciamento de cursos utilizando middleware para validação e persistência em memória.

### 🌟 Características

- ✅ Servidor HTTP com Express.js
- ✅ Middleware para validação de dados
- ✅ Sistema de rotas completo
- ✅ Operações CRUD completas
- ✅ Tratamento de erros
- ✅ Persistência em memória

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

Para iniciar o servidor em modo de desenvolvimento (com hot-reload):
```bash
npm run dev
```

O servidor será iniciado na porta 3000. Você verá a aplicação funcionando em `http://localhost:3000`.

## 📡 Endpoints da API

### Listar todos os cursos
```
GET /cursos
```

**Exemplo de resposta:**
```json
[
  "Node JS",
  "JavaScript",
  "React Native"
]
```

### Buscar curso por índice
```
GET /cursos/0
```

**Exemplo de resposta:**
```json
"Node JS"
```

### Criar novo curso
```
POST /cursos
```

**Corpo da requisição:**
```json
{
  "name": "React JS"
}
```

**Exemplo de resposta:**
```json
[
  "Node JS",
  "JavaScript",
  "React Native",
  "React JS"
]
```

### Atualizar curso existente
```
PUT /cursos/0
```

**Corpo da requisição:**
```json
{
  "name": "Node.js Avançado"
}
```

**Exemplo de resposta:**
```json
[
  "Node.js Avançado",
  "JavaScript",
  "React Native"
]
```

### Remover curso
```
DELETE /cursos/0
```

**Exemplo de resposta:**
```json
{
  "message": "Curso deletado com sucesso!"
}
```

## 🧪 Como Testar a API

Você pode testar a API utilizando ferramentas como Postman ou Insomnia.

### Exemplos com cURL

#### Listar todos os cursos:
```bash
curl -X GET http://localhost:3000/cursos
```

#### Buscar curso por índice:
```bash
curl -X GET http://localhost:3000/cursos/0
```

#### Criar novo curso:
```bash
curl -X POST http://localhost:3000/cursos \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React JS"
  }'
```

#### Atualizar curso:
```bash
curl -X PUT http://localhost:3000/cursos/0 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Node.js Avançado"
  }'
```

#### Remover curso:
```bash
curl -X DELETE http://localhost:3000/cursos/0
```

### 📱 Testando com Postman/Insomnia

1. Crie uma nova requisição
2. Selecione o método (GET, POST, PUT ou DELETE)
3. Digite a URL completa (ex: http://localhost:3000/cursos)
4. Para POST e PUT, no corpo da requisição selecione JSON e adicione o corpo conforme exemplo acima
5. Envie a requisição e verifique a resposta

## 🏗️ Estrutura do Projeto

```
.
├── node_modules/        # Dependências do projeto
├── index.js             # Arquivo principal com a configuração do servidor e rotas
├── package.json         # Configuração do projeto e dependências
├── package-lock.json    # Versões específicas das dependências
├── .gitignore           # Arquivos e pastas ignorados pelo git
├── index.html           # Documentação da API em formato HTML
└── README.md            # Este arquivo
```

## 📊 Arquitetura

O projeto segue uma arquitetura simples com Express.js:

1. **Middlewares**: Responsáveis pela validação e processamento das requisições
   - Middleware Global: Registra todas as URLs chamadas
   - checkCurso: Valida se o nome do curso foi informado
   - checkIndexCurso: Verifica se o índice do curso existe
   
2. **Rotas**: Definem os endpoints disponíveis na API
   - GET /cursos: Lista todos os cursos
   - GET /cursos/:index: Retorna um curso específico
   - POST /cursos: Adiciona um novo curso
   - PUT /cursos/:index: Atualiza um curso existente
   - DELETE /cursos/:index: Remove um curso da lista

3. **Persistência**: Os dados são armazenados em memória em um array JavaScript