import { InMemoryStatementsRepository } from '@modules/statements/repositories/in-memory/InMemoryStatementsRepository';
import { User } from '@modules/users/entities/User';
import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/InMemoryUsersRepository';
import { AppError } from '@shared/errors/AppError';
import {GetStatementOperationUseCase} from './GetStatementOperationUseCase';

let usersRepositoryInMemory: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let getStatementOperationUseCase: GetStatementOperationUseCase;
let user: User;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe('Get Statement Operation', () => {

  beforeEach(async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    getStatementOperationUseCase = new GetStatementOperationUseCase(
      usersRepositoryInMemory, inMemoryStatementsRepository)
    user = await usersRepositoryInMemory.create({
      name: 'Name user',
      email: 'mail@mail.com',
      password: '1234'
    });
  });

  it('should be able to get a statement operation', async () => {
    const statement = await inMemoryStatementsRepository.create( {
      user_id: user.id,
      type: `deposit` as OperationType,
      amount: 100,
      description: 'deposit 100 test'
    })

    const operation = await getStatementOperationUseCase.execute( {
      user_id: user.id, statement_id: statement.id
    })

    expect(operation.type).toBe('deposit')

  })

  it('should NOT be able to get a statement operation a nonexistent user', async () => {
    await expect(async () => {
      const statement = await inMemoryStatementsRepository.create( {
        user_id: user.id,
        type: `deposit` as OperationType,
        amount: 100,
        description: 'deposit 100 test'
      })

      await getStatementOperationUseCase.execute( {
        user_id: 'nonexistent', statement_id: statement.id
      })
    }).rejects.toBeInstanceOf(AppError);

  })

  it('should NOT be able to get a statement operation a nonexistent statement', async () => {
    await expect(async () => {
      await getStatementOperationUseCase.execute( {
        user_id: user.id, statement_id: 'nonexistent'
      })
    }).rejects.toBeInstanceOf(AppError);
  })

})
