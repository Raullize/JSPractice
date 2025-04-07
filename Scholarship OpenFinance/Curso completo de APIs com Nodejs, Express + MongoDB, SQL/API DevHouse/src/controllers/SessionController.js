import User from '../models/User';
import * as Yup from 'yup';

/**
 * Controller responsável por gerenciar as sessões de usuário
 * Segue o padrão REST com os métodos:
 * - index: Lista todas as sessões
 * - show: Mostra uma sessão específica
 * - store: Cria uma nova sessão (login)
 * - update: Atualiza uma sessão existente
 * - destroy: Remove uma sessão (logout)
 */
class SessionController {
  /**
   * Cria uma nova sessão (login)
   * @param {Object} req - Objeto da requisição
   * @param {Object} res - Objeto da resposta
   * @returns {Object} - Usuário autenticado
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });
    
    const { email } = req.body;

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Falha na validação' });
    }

    let user = await User.findOne({ email });

    if(!user){
      user = await User.create({ email });
    }
    
    return res.json(user);
  }
}

export default new SessionController();