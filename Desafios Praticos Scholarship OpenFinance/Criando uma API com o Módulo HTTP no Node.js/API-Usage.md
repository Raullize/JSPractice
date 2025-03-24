# API Usage - Módulo HTTP no Node.js

## Como iniciar o servidor

```bash
# Navegue até a pasta do projeto
cd "Desafios Praticos Scholarship OpenFinance/Criando uma API com o Módulo HTTP no Node.js"

# Execute o arquivo server.js
node server.js
```

O servidor será iniciado em `http://127.0.0.1:3000`.

## Endpoints disponíveis

### 1. GET /health-check

Retorna o status do servidor e um timestamp.

**Exemplo de chamada com cURL:**
```bash
curl -X GET http://127.0.0.1:3000/health-check
```

**Resposta esperada:**
```json
{
  "success": true,
  "timestamp": "2025-03-24T12:00:00.000Z"
}
```

### 2. GET /is-prime-number

Verifica se um número é primo.

**Exemplo de chamada com cURL para número primo:**
```bash
curl -X GET "http://127.0.0.1:3000/is-prime-number?number=7"
```

**Resposta esperada:**
```json
{
  "isPrime": true
}
```

**Exemplo de chamada com cURL para número não primo:**
```bash
curl -X GET "http://127.0.0.1:3000/is-prime-number?number=42"
```

**Resposta esperada:**
```json
{
  "isPrime": false
}
```

**Exemplo de chamada com input inválido:**
```bash
curl -X GET "http://127.0.0.1:3000/is-prime-number?number=abc"
```

**Resposta esperada:**
```json
{
  "error": "Invalid input"
}
```

### 3. POST /count

Incrementa e retorna um contador global.

**Exemplo de chamada com cURL:**
```bash
curl -X POST http://127.0.0.1:3000/count \
  -H "Content-Type: application/json" \
  -d '{"incrementBy": 5}'
```

**Resposta esperada:**
```json
{
  "counter": 5
}
```

**Exemplo de chamada com input inválido:**
```bash
curl -X POST http://127.0.0.1:3000/count \
  -H "Content-Type: application/json" \
  -d '{"incrementBy": "abc"}'
```

**Resposta esperada:**
```json
{
  "error": "Invalid input"
}
```

## Notas adicionais

- O contador é mantido em memória e será reiniciado quando o servidor for reiniciado.
- O endpoint `/is-prime-number` aceita apenas números inteiros positivos.
- O endpoint `/count` aceita apenas valores de incremento que sejam números inteiros positivos. 