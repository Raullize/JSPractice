/**
 * Servidor HTTP para a API de Heróis
 * Implementação de uma API REST sem uso de frameworks externos
 * Utiliza apenas os módulos nativos do Node.js
 */

// Importação do módulo HTTP nativo do Node.js para criar o servidor
const http = require('http')
// Definição da porta onde o servidor será executado
const PORT = 3000
// Cabeçalho padrão para todas as respostas (formato JSON)
const DEFAULT_HEADER = { 'Content-Type': 'application/json' }

// Importação da factory que cria instâncias do serviço de heróis
const HeroFactory = require('./factories/heroFactory')
// Criação de uma instância do serviço de heróis
const heroService = HeroFactory.generateInstance()
// Importação da entidade Hero
const Hero = require('./entities/hero')

/**
 * Definição das rotas da API e seus respectivos handlers
 * Cada rota é mapeada para uma função que processa a requisição e gera a resposta
 */
const routes = {
    // Rota GET /heroes - Lista todos os heróis ou busca por ID
    '/heroes:get': async (request, response) => {
        const { id } = request.queryString
        const heroes = await heroService.find(id)
        response.write(JSON.stringify({ results: heroes }))

        return response.end()
    },
    // Rota POST /heroes - Cria um novo herói
    '/heroes:post': async (request, response) => {
        // Iterador assíncrono para processar os dados recebidos
        for await (const data of request) {
            try {
                // Converte os dados JSON recebidos para objeto
                const item = JSON.parse(data)
                // Cria uma nova instância de herói
                const hero = new Hero(item)
                // Valida se todos os campos obrigatórios estão presentes
                const { error, valid } = hero.isValid()
                if (!valid) {
                    response.writeHead(400, DEFAULT_HEADER)
                    response.write(JSON.stringify({ error: error.join(',') }))
                    return response.end()
                }

                // Persiste o herói no banco de dados
                const id = await heroService.create(hero)
                response.writeHead(201, DEFAULT_HEADER)
                response.write(JSON.stringify({ success: 'User Created with success!!', id }))

                // só jogamos o return aqui pois sabemos que é um objeto body por requisicao
                // se fosse um arquivo, que sobe sob demanda 
                // ele poderia entrar mais vezes em um mesmo evento, aí removeriamos o return
                return response.end()
            } catch (error) {
                return handleError(response)(error)
            }
        }
    },
    // Rota padrão para endpoints não mapeados
    default: (request, response) => {
        response.write('Hello!')
        response.end()
    }
}

/**
 * Função para tratar erros nas requisições
 * @param {Object} response - Objeto de resposta HTTP
 * @returns {Function} Função de tratamento de erro que recebe o erro e finaliza a resposta
 */
const handleError = response => {
    return error => {
        console.error('Deu Ruim!***', error)
        response.writeHead(500, DEFAULT_HEADER)
        response.write(JSON.stringify({ error: 'Internal Server Error!!' }))

        return response.end()
    }
}

/**
 * Handler principal que processa todas as requisições
 * Analisa a URL e método, seleciona o handler apropriado e executa
 * @param {Object} request - Objeto de requisição HTTP
 * @param {Object} response - Objeto de resposta HTTP
 * @returns {Promise} Promessa que representa o processamento da requisição
 */
const handler = (request, response) => {
    // Extrai URL e método da requisição
    const { url, method } = request
    // Extrai parâmetros da URL (/heroes/123 -> route='heroes', id=123)
    const [first, route, id] = url.split('/')
    // Adiciona o ID à query string, convertendo para número se for numérico
    request.queryString = { id: isNaN(id) ? id : Number(id) }

    // Cria a chave para buscar o handler correto (ex: /heroes:get)
    const key = `/${route}:${method.toLowerCase()}`

    // Define o cabeçalho padrão para a resposta
    response.writeHead(200, DEFAULT_HEADER)

    // Seleciona o handler adequado para a rota ou usa o handler padrão
    const chosen = routes[key] || routes.default
    // Executa o handler e trata possíveis erros
    return chosen(request, response).catch(handleError(response))
}

// Cria e inicia o servidor HTTP na porta definida
http.createServer(handler)
    .listen(PORT, () => console.log('server running at', PORT))