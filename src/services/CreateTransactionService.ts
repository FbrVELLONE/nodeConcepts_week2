import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (title === '') throw Error('Title is empty!');
    else if (value < 0) throw Error('Value must be positive!');
    else if (type !== 'income' && type !== 'outcome') {
      throw Error('Type must be income or outcome');
    }

    if (
      type === 'outcome' &&
      this.transactionsRepository.getBalance().total - value < 0
    ) {
      throw Error(
        'Cant do this operation, balance is negative. EARN MORE MONEY!',
      );
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
