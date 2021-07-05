import { InMemoryStatementsRepository } from '@modules/statements/repositories/in-memory/InMemoryStatementsRepository';
import { User } from '@modules/users/entities/User';
import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/InMemoryUsersRepository';
import { AppError } from '@shared/errors/AppError';
import {GetBalanceUseCase} from './GetBalanceUseCase';

let usersRepositoryInMemory: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let getBalanceUseCase: GetBalanceUseCase;
let user: User;
describe('Get Balance', () => {

  beforeEach(async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository, usersRepositoryInMemory)
    user = await usersRepositoryInMemory.create({
      name: 'Name user',
      email: 'mail@mail.com',
      password: '1234'
    });
  });

  it('should be able to list balance', async () => {
    const statement = await getBalanceUseCase.execute( {user_id: user.id })

    expect(statement).toHaveProperty('balance');
    expect(statement).toHaveProperty('statement');
  })

  it('should NOT be able to list balance an nonexistent user', async () => {
    await expect(async () => {
      const statement = await getBalanceUseCase.execute( {user_id: 'nonexistent' })
    }).rejects.toBeInstanceOf(AppError);
 })
})
