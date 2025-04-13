import { Op } from 'sequelize';
import * as Yup from 'yup';
import BankAccount from '../models/BankAccount';
import Transaction from '../models/Transaction';

class TransactionController {
  async index(req, res) {
    const { account_id } = req.params;
    const { page = 1, limit = 20, start_date, end_date, type, category } = req.query;

    // Verificando se a conta pertence ao usuário
    const account = await BankAccount.findOne({
      where: { 
        id: account_id,
        user_id: req.userId 
      },
    });

    if (!account) {
      return res.status(404).json({ error: 'Conta bancária não encontrada.' });
    }

    // Montando os filtros
    const where = { account_id };

    if (start_date && end_date) {
      where.transaction_date = {
        [Op.between]: [new Date(start_date), new Date(end_date)],
      };
    } else if (start_date) {
      where.transaction_date = {
        [Op.gte]: new Date(start_date),
      };
    } else if (end_date) {
      where.transaction_date = {
        [Op.lte]: new Date(end_date),
      };
    }

    if (type) {
      where.type = type;
    }

    if (category) {
      where.category = category;
    }

    const transactions = await Transaction.findAll({
      where,
      limit: parseInt(limit, 10),
      offset: (page - 1) * limit,
      order: [['transaction_date', 'DESC']],
      attributes: ['id', 'description', 'amount', 'type', 'transaction_date', 'category'],
    });

    const count = await Transaction.count({ where });

    return res.json({
      transactions,
      total: count,
      page: parseInt(page, 10),
      pages: Math.ceil(count / limit),
    });
  }

  async show(req, res) {
    const transaction = await Transaction.findByPk(req.params.id, {
      attributes: ['id', 'description', 'amount', 'type', 'transaction_date', 'category'],
      include: [
        {
          model: BankAccount,
          as: 'account',
          attributes: ['id', 'bank_name', 'agency', 'account_number'],
          where: { user_id: req.userId },
        },
      ],
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transação não encontrada ou não pertence ao usuário.' });
    }

    return res.json(transaction);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      amount: Yup.number().required(),
      type: Yup.string().required().oneOf(['deposit', 'withdrawal', 'transfer']),
      category: Yup.string().required(),
      transaction_date: Yup.date().default(() => new Date()),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const { account_id } = req.params;

    // Verificando se a conta existe e pertence ao usuário
    const account = await BankAccount.findOne({
      where: { 
        id: account_id,
        user_id: req.userId 
      },
    });

    if (!account) {
      return res.status(404).json({ error: 'Conta bancária não encontrada.' });
    }

    // Criando a transação
    const transaction = await Transaction.create({
      ...req.body,
      account_id,
    });

    // Atualizando o saldo da conta
    let newBalance = parseFloat(account.balance);
    if (req.body.type === 'deposit') {
      newBalance += parseFloat(req.body.amount);
    } else if (req.body.type === 'withdrawal' || req.body.type === 'transfer') {
      newBalance -= parseFloat(req.body.amount);
    }

    await account.update({ balance: newBalance });

    return res.json(transaction);
  }
}

export default new TransactionController(); 