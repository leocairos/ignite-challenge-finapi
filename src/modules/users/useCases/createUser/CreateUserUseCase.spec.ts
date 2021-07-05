import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';

import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserError } from './CreateUserError';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Name user',
      email: 'mail@mail.com',
      password: '1234'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with exists email', async () => {
    const user = await createUserUseCase.execute({
      name: 'Name user',
      email: 'mail1@mail.com',
      password: '1234'
    });

    await expect(createUserUseCase.execute({
      name: user.name+'2',
      email: user.email,
      password: user.password
    })).rejects.toBeInstanceOf(CreateUserError);
  })

});
