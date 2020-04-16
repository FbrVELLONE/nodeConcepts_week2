import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(function verf(all, unit) {
      // eslint-disable-next-line no-param-reassign
      if (unit.type === 'income') all += unit.value;

      return all;
    }, 0);

    const outcome = this.transactions.reduce(function verf(all, unit) {
      // eslint-disable-next-line no-param-reassign
      if (unit.type === 'outcome') all += unit.value;

      return all;
    }, 0);

    const total = income - outcome;
    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
