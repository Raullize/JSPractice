import Reserve from '../models/Reserve';
import User from '../models/User';
import House from '../models/House';

/**
 * Controller responsável por gerenciar as reservas de casas
 * Implementa as operações CRUD (Create, Read, Update, Delete)
 */
class ReserveController {
  /**
   * Lista todas as reservas do usuário
   * @param {Object} req - Objeto da requisição
   * @param {Object} res - Objeto da resposta
   * @returns {Array} - Lista de reservas
   */
  async index(req, res) {
    // Extrai o ID do usuário dos headers
    const { user_id } = req.headers;

    // Busca todas as reservas do usuário, populando os dados da casa
    const reserves = await Reserve.find({ user: user_id }).populate('house');

    return res.json(reserves);
  }

  /**
   * Cria uma nova reserva
   * @param {Object} req - Objeto da requisição
   * @param {Object} res - Objeto da resposta
   * @returns {Object} - Reserva criada
   */
  async store(req, res) {
    // Extrai os dados da requisição
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    // Verifica se a casa existe
    const house = await House.findById(house_id);
    if (!house) {
      return res.status(400).json({ error: 'Essa casa não existe.' });
    }

    // Verifica se a casa está disponível
    if (house.status !== true) {
      return res.status(400).json({ error: 'Solicitação indisponivel.' });
    }

    // Verifica se o usuário não é o dono da casa
    const user = await User.findById(user_id);
    if (String(user._id) === String(house.user)) {
      return res.status(401).json({ error: 'Reserva não permitida.' });
    }

    // Cria a reserva
    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date,
    });

    // Busca a reserva criada com os dados populados
    const populatedReserve = await Reserve.findById(reserve._id)
      .populate('house')
      .populate('user');

    return res.json(populatedReserve);
  }

  /**
   * Remove uma reserva
   * @param {Object} req - Objeto da requisição
   * @param {Object} res - Objeto da resposta
   * @returns {Object} - Resposta vazia em caso de sucesso
   */
  async destroy(req, res) {
    // Extrai o ID da reserva
    const { reserve_id } = req.body;

    // Remove a reserva do banco de dados
    await Reserve.findByIdAndDelete({ _id: reserve_id });

    return res.send();
  }
}

// Exporta uma instância do controller
export default new ReserveController();