/**
 * Factory responsável por criar instâncias do serviço de heróis
 * Implementa o padrão de projeto Factory para gerenciar dependências
 */
const HeroRepository = require('./../repositories/heroRepository')
const HeroService = require('./../services/heroService')

const { join } = require('path')
// Define o caminho do arquivo de dados
const filename = join(__dirname, '../../database', 'data.json')

/**
 * Gera uma instância configurada do serviço de heróis
 * Cria e configura todas as dependências necessárias
 * @returns {Object} Instância do serviço de heróis pronta para uso
 */
const generateInstance = () => {
    // Cria o repositório com o arquivo de dados configurado
    const heroRepository = new HeroRepository({
        file: filename
    })
    // Cria o serviço injetando o repositório como dependência
    const heroService = new HeroService({
        heroRepository
    })

    return heroService
}

module.exports = { generateInstance }

// generateInstance().find().then(console.log)