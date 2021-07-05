import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { AppError } from '../../../../shared/errors/AppError';

import { ShowUserProfileUseCase } from './ShowUserProfileUseCase';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ICreateUserDTO } from '../createUser/ICreateUserDTO';

let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

describe('Show user profile', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to show user profile info', async () => {
    const user: ICreateUserDTO = {
      name: 'User Name',
      email: 'mail@user.com',
      password: '1234'
    }

    const userCreated = await createUserUseCase.execute(user);

    const result = await showUserProfileUseCase.execute(userCreated.id);

    expect(result.email).toEqual(user.email);
  });

  it('should not be able to show profile an nonexistent user', async() => {
    await expect(async () => {
      await showUserProfileUseCase.execute('nonexistentUser');
    }).rejects.toBeInstanceOf(AppError);
  });

});
