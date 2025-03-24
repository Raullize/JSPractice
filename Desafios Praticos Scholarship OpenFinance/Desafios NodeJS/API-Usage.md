# API Usage - Módulo HTTP no Node.js

## Como iniciar o servidor

```bash
# Navegue até a pasta do projeto
cd "Desafios Praticos Scholarship OpenFinance/Desafios Node.js"

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

### 4. GET /stock-insight

Consulta o preço atual do Bitcoin na API do CoinGecko e fornece uma sugestão de compra.

**Parâmetros de consulta:**
- `currency` (opcional): Moeda para exibir o preço (valores aceitos: `usd` ou `brl`, padrão: `usd`)

**Lógica de sugestão de compra:**
- Para BRL:
  - < R$300.000: "Bom momento para compra!"
  - Entre R$300.000 e R$450.000: "Preço razoável. Avalie antes de comprar."
  - > R$450.000: "Bitcoin está caro. Pode ser melhor esperar."
- Para USD:
  - < $60.000: "Bom momento para compra!"
  - Entre $60.000 e $80.000: "Preço razoável. Avalie antes de comprar."
  - > $80.000: "Bitcoin está caro. Pode ser melhor esperar."

**Exemplo de chamada com cURL (USD - padrão):**
```bash
curl -X GET http://127.0.0.1:3000/stock-insight
```

**Resposta esperada:**
```json
{
  "btc_price": 39500.75,
  "currency": "usd",
  "suggestion": "Bom momento para compra!"
}
```

**Exemplo de chamada com cURL (BRL):**
```bash
curl -X GET "http://127.0.0.1:3000/stock-insight?currency=brl"
```

**Resposta esperada:**
```json
{
  "btc_price": 195000.50,
  "currency": "brl",
  "suggestion": "Bom momento para compra!"
}
```

**Exemplo de resposta em caso de erro:**
```json
{
  "error": "Serviço indisponível",
  "message": "Não foi possível consultar o preço do Bitcoin no momento"
}
```

## Notas adicionais

- O contador é mantido em memória e será reiniciado quando o servidor for reiniciado.
- O endpoint `/is-prime-number` aceita apenas números inteiros positivos.
- O endpoint `/count` aceita apenas valores de incremento que sejam números inteiros positivos.
- O endpoint `/stock-insight` requer Node.js 18 ou superior para utilizar o módulo `fetch` nativo.
- Os dados do Bitcoin são obtidos em tempo real da API pública do CoinGecko. 