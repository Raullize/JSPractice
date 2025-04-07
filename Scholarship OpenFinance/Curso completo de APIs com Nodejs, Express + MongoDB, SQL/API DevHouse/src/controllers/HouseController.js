import House from '../models/House';
import User from '../models/User';
import * as Yup from 'yup';

/**
 * Controller responsável por gerenciar as operações relacionadas às casas
 * Implementa as operações CRUD (Create, Read, Update, Delete)
 */
class HouseController {
  /**
   * Lista todas as casas disponíveis
   * @param {Object} req - Objeto da requisição
   * @param {Object} res - Objeto da resposta
   * @returns {Array} - Lista de casas
   */
  async index(req, res) {
    // Extrai o status da query string (opcional)
    const { status } = req.query;

    // Busca casas com o status especificado
    const houses = await House.find({ status });

    return res.json(houses);
  }

  /**
   * Cria uma nova casa
   * @param {Object} req - Objeto da requisição
   * @param {Object} res - Objeto da resposta
   * @returns {Object} - Casa criada
   */
  async store(req, res) {
    // Validação dos dados de entrada
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    // Verifica se os dados são válidos
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    // Extrai os dados do arquivo enviado e do corpo da requisição
    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    // Cria uma nova casa no banco de dados
    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.json(house);
  }

  /**
   * Atualiza uma casa existente
   * @param {Object} req - Objeto da requisição
   * @param {Object} res - Objeto da resposta
   * @returns {Object} - Resposta vazia em caso de sucesso
   */
  async update(req, res) {
    // Validação dos dados de entrada
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    // Verifica se os dados são válidos
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    // Extrai os dados da requisição
    const { filename } = req.file;
    const { house_id } = req.params;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    // Verifica se o usuário é o dono da casa
    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if (String(user._id) !== String(houses.user)) {
      return res.status(401).json({ error: 'Não autorizado.' });
    }

    // Atualiza os dados da casa
    await House.updateOne(
      { _id: house_id },
      {
        user: user_id,
        thumbnail: filename,
        description,
        price,
        location,
        status,
      }
    );

    return res.send();
  }

  /**
   * Remove uma casa
   * @param {Object} req - Objeto da requisição
   * @param {Object} res - Objeto da resposta
   * @returns {Object} - Resposta vazia em caso de sucesso
   */
  async destroy(req, res) {
    // Extrai os dados da requisição
    const { house_id } = req.params;
    const { user_id } = req.headers;

    // Verifica se o usuário é o dono da casa
    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if (String(user._id) !== String(houses.user)) {
      return res.status(401).json({ error: 'Não autorizado.' });
    }

    // Remove a casa do banco de dados
    await House.findByIdAndDelete({ _id: house_id });

    return res.send();
  }
}

// Exporta uma instância do controller
export default new HouseController();