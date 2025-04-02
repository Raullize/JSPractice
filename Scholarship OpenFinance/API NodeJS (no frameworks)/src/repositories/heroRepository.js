/**
 * Repositório responsável pelo acesso e manipulação de dados dos heróis
 * Utiliza sistema de arquivos para armazenamento (JSON)
 */
const { readFile, writeFile } = require('fs/promises')
class HeroRepository {
    /**
     * Inicializa o repositório
     * @param {Object} param0 - Objeto de configuração
     * @param {string} param0.file - Caminho para o arquivo de dados
     */
    constructor({ file }) {
        this.file = file
    }

    /**
     * Método privado para obter o conteúdo atual do arquivo
     * @returns {Promise<Array>} Array de heróis do arquivo
     */
    async _currentFileContent() {
        return JSON.parse(await readFile(this.file))
    }

    /**
     * Busca um herói pelo ID ou retorna todos se nenhum ID for fornecido
     * @param {number} itemId - ID do herói a ser buscado (opcional)
     * @returns {Promise<Array|Object>} Todos os heróis ou um herói específico
     */
    async find(itemId) {
        const all = await this._currentFileContent()
        if (!itemId) return all

        return all.find(({ id }) => itemId === id)
    }
    
    /**
     * Cria um novo registro de herói no arquivo
     * @param {Object} data - Dados do herói a ser criado
     * @returns {Promise<number>} ID do herói criado
     */
    async create(data) {
        const currentFile = await this._currentFileContent()
        currentFile.push(data)

        await writeFile(this.file, JSON.stringify(currentFile))

        return data.id
    }
}

module.exports = HeroRepository

// const heroRepository = new HeroRepository({ 
//     file: './../../database/data.json'
// })
// heroRepository.create({ id: 2, name: 'Chapolin'})
//     .then(console.log)
//     .catch(error => console.log('error', error))
// heroRepository.find(1).then(console.log).catch(error => console.log('error', error))