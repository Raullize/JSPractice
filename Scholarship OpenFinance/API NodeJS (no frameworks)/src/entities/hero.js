/**
 * Classe que representa a entidade Herói no sistema
 * Responsável por definir a estrutura de dados e validações
 */
class Hero {
    /**
     * Cria uma nova instância de Herói
     * @param {Object} param0 - Dados do herói
     * @param {number} param0.id - ID do herói (opcional, gerado automaticamente)
     * @param {string} param0.name - Nome do herói
     * @param {number} param0.age - Idade do herói
     * @param {string} param0.power - Poder/habilidade do herói
     */
    constructor({ id, name, age, power}) {
        this.id = Math.floor(Math.random() * 100) + Date.now()
        this.name = name
        this.age = age
        this.power = power
    }

    /**
     * Valida se todos os campos obrigatórios do herói estão preenchidos
     * @returns {Object} Objeto com resultado da validação
     * @returns {boolean} valid - Indica se o herói é válido
     * @returns {Array<string>} error - Lista de erros encontrados
     */
    isValid() {
        const propertyNames = Object.getOwnPropertyNames(this)
        const amountInvalid = propertyNames
            .map(property => (!!this[property]) ? null : `${property} is missing!`)
            .filter(item => !!item)
            
        return {
            valid: amountInvalid.length === 0,
            error: amountInvalid
        }
    }
}

module.exports = Hero

// const hero = new Hero({  name: "Chapolin", age: 100, power: "SuperForça"})
// console.log('valid', hero.isValid())
// console.log('valid', hero)