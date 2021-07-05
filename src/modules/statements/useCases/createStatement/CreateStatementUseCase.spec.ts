import { InMemoryStatementsRepository } from '@modules/statements/repositories/in-memory/InMemoryStatementsRepository';
import { User } from '@modules/users/entities/User';
import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/InMemoryUsersRepository';
import { AppError } from '@shared/errors/AppError';
import {CreateStatementUseCase} from './CreateStatementUseCase';

let usersRepositoryInMemory: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;
let user: User;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe('Create Statement', ()=>{

  beforeEach(async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(usersRepositoryInMemory, inMemoryStatementsRepository)
    user = await usersRepositoryInMemory.create({
      name: 'Name user',
      email: 'mail@mail.com',
      password: '1234'
    });
  });

  it('should be able to create a new deposit', async ()=>{
    const statement = await createStatementUseCase.execute( {
      user_id: user.id,
      type: `deposit` as OperationType,
      amount: 100,
      description: 'deposit 100 test'
    })

    expect(statement).toHaveProperty('id');
  })

  it('should NOT be able to create a new statement without user', async ()=>{
    await expect(async ()=> {
      await createStatementUseCase.execute({
        user_id: 'noexistentuser',
        type: `deposit` as OperationType,
        amount: 100,
        description: 'deposit 100 test'
      })
    }).rejects.toBeInstanceOf(AppError);
  })

  it('should be able to create a new withdraw ', async ()=>{

    await createStatementUseCase.execute( {
      user_id: user.id,
      type: `deposit` as OperationType,
      amount: 100,
      description: 'deposit 100 test'
    })

    const statement =  await createStatementUseCase.execute( {
      user_id: user.id,
      type: `withdraw` as OperationType,
      amount: 90,
      description: 'deposit 100 test'
    })

    expect(statement).toHaveProperty('id');
  })

  it('should NOT be able to create a new withdraw with insufficient funds', async ()=>{
    await expect(async () => {
      await createStatementUseCase.execute( {
        user_id: user.id,
        type: `withdraw` as OperationType,
        amount: 90,
        description: 'deposit 100 test'
      })
    }).rejects.toBeInstanceOf(AppError);
  })

})
