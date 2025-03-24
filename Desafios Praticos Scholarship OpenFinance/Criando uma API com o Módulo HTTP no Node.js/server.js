const http = require('http');
const { URL } = require('url');

// Contador global para o endpoint /count
let counter = 0;

// Função para verificar se um número é primo
function isPrime(number) {
  if (number <= 1) return false;
  if (number <= 3) return true;
  
  if (number % 2 === 0 || number % 3 === 0) return false;
  
  let i = 5;
  while (i * i <= number) {
    if (number % i === 0 || number % (i + 2) === 0) return false;
    i += 6;
  }
  
  return true;
}

// Função para processar o corpo da requisição
function parseRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    
    request.on('data', (chunk) => {
      chunks.push(chunk);
    });
    
    request.on('end', () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }
      
      const bodyString = Buffer.concat(chunks).toString();
      try {
        const body = JSON.parse(bodyString);
        resolve(body);
      } catch (error) {
        reject(new Error('Invalid JSON'));
      }
    });
    
    request.on('error', (error) => {
      reject(error);
    });
  });
}

// Criação do servidor
const server = http.createServer(async (request, response) => {
  // Configura o cabeçalho de resposta para JSON
  response.setHeader('Content-Type', 'application/json');
  
  try {
    const baseUrl = `http://${request.headers.host}`;
    const requestUrl = new URL(request.url, baseUrl);
    const path = requestUrl.pathname;
    const method = request.method;
    
    // Endpoint GET /health-check
    if (method === 'GET' && path === '/health-check') {
      response.statusCode = 200;
      const responseBody = {
        success: true,
        timestamp: new Date().toISOString()
      };
      response.end(JSON.stringify(responseBody));
      return;
    }
    
    // Endpoint GET /is-prime-number
    if (method === 'GET' && path === '/is-prime-number') {
      const numberParam = requestUrl.searchParams.get('number');
      
      if (!numberParam || isNaN(numberParam) || parseInt(numberParam) < 1) {
        response.statusCode = 400;
        response.end(JSON.stringify({ error: 'Invalid input' }));
        return;
      }
      
      const number = parseInt(numberParam);
      const primeResult = isPrime(number);
      
      response.statusCode = 200;
      response.end(JSON.stringify({ isPrime: primeResult }));
      return;
    }
    
    // Endpoint POST /count
    if (method === 'POST' && path === '/count') {
      try {
        const body = await parseRequestBody(request);
        
        if (!body.incrementBy || 
            typeof body.incrementBy !== 'number' || 
            !Number.isInteger(body.incrementBy) || 
            body.incrementBy <= 0) {
          response.statusCode = 400;
          response.end(JSON.stringify({ error: 'Invalid input' }));
          return;
        }
        
        counter += body.incrementBy;
        
        response.statusCode = 200;
        response.end(JSON.stringify({ counter }));
        return;
      } catch (error) {
        response.statusCode = 400;
        response.end(JSON.stringify({ error: 'Invalid input' }));
        return;
      }
    }
    
    response.statusCode = 404;
    response.end(JSON.stringify({ error: 'Route not found' }));
    
  } catch (error) {
    response.statusCode = 500;
    response.end(JSON.stringify({ error: 'Internal server error' }));
  }
});

// Porta e host do servidor
const PORT = 3000;
const HOST = '127.0.0.1';

// Inicia o servidor
server.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
}); 