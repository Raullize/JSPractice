import { Op } from 'sequelize';
import BankAccount from '../models/BankAccount';
import Transaction from '../models/Transaction';

class BalanceController {
  async index(req, res) {
    const { month, year, bank_name } = req.query;

    // Filtros para contas bancárias
    const whereAccount = {
      user_id: req.userId,
      is_active: true,
    };

    // Adiciona filtro por banco, se especificado
    if (bank_name) {
      whereAccount.bank_name = { [Op.iLike]: `%${bank_name}%` };
    }

    // Busca as contas do usuário com os filtros aplicados
    const accounts = await BankAccount.findAll({
      where: whereAccount,
      attributes: ['id', 'bank_name', 'agency', 'account_number', 'account_type', 'balance'],
    });

    // Se não houver contas com os filtros, retorna resultado vazio
    if (accounts.length === 0) {
      return res.json({
        total_balance: 0,
        accounts_count: 0,
        accounts: [],
        message: bank_name
          ? `Nenhuma conta encontrada para o banco ${bank_name}`
          : 'Nenhuma conta bancária ativa',
      });
    }

    // Cálculo do saldo total nas contas filtradas
    const totalBalance = accounts.reduce((sum, account) => sum + parseFloat(account.balance), 0);

    // Se não houver filtro de mês/ano, retorna apenas o consolidado das contas
    if (!month || !year) {
      return res.json({
        total_balance: totalBalance,
        accounts_count: accounts.length,
        accounts: accounts.map((account) => ({
          id: account.id,
          bank_name: account.bank_name,
          account_type: account.account_type,
          balance: account.balance,
        })),
      });
    }

    // Período para filtrar transações
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Busca todas as transações do período
    const transactions = await Transaction.findAll({
      where: {
        account_id: {
          [Op.in]: accounts.map((account) => account.id),
        },
        transaction_date: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ['id', 'description', 'amount', 'type', 'category', 'transaction_date'],
    });

    // Cálculo das receitas e despesas
    const income = transactions
      .filter((transaction) => transaction.type === 'deposit')
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

    const expenses = transactions
      .filter((transaction) => transaction.type === 'withdrawal' || transaction.type === 'transfer')
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

    // Categorização das despesas
    const categorizedExpenses = transactions
      .filter((transaction) => transaction.type === 'withdrawal' || transaction.type === 'transfer')
      .reduce((categories, transaction) => {
        const { category } = transaction;
        if (!categories[category]) {
          categories[category] = 0;
        }
        categories[category] += parseFloat(transaction.amount);
        return categories;
      }, {});

    // Retorna análise financeira completa
    return res.json({
      period: {
        month,
        year,
      },
      total_balance: totalBalance,
      monthly_summary: {
        income,
        expenses,
        balance: income - expenses,
      },
      categorized_expenses: Object.entries(categorizedExpenses).map(([category, amount]) => ({
        category,
        amount,
        percentage: Math.round((amount / expenses) * 100),
      })),
      accounts_count: accounts.length,
      accounts: accounts.map((account) => ({
        id: account.id,
        bank_name: account.bank_name,
        account_type: account.account_type,
        balance: account.balance,
      })),
    });
  }
}

export default new BalanceController();
