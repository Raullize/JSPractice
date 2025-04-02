/**
 * Serviço responsável pela lógica de negócios relacionada aos heróis
 * Atua como intermediário entre a API e o repositório
 */
class HeroService {
    /**
     * Inicializa o serviço com o repositório de heróis
     * @param {Object} param0 - Objeto de configuração
     * @param {Object} param0.heroRepository - Instância do repositório de heróis
     */
    constructor({ heroRepository }) {
        this.heroRepository = heroRepository
    }

    /**
     * Busca um herói pelo ID ou lista todos os heróis
     * @param {number} itemId - ID do herói a ser buscado (opcional)
     * @returns {Promise<Array|Object>} Lista de heróis ou um herói específico
     */
    async find(itemId) {
        return this.heroRepository.find(itemId)
    }

    /**
     * Cria um novo herói no sistema
     * @param {Object} data - Dados do herói a ser criado
     * @returns {Promise<number>} ID do herói criado
     */
    async create(data) {
        return this.heroRepository.create(data)
    }
}

module.exports = HeroService