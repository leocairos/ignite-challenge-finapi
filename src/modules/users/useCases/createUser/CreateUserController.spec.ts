import request from 'supertest';
import { app } from '../../../../app';
import { Connection } from 'typeorm';

import { v4 as uuidV4 } from 'uuid';

import createConnection from '../../../../database';

let connection: Connection;
let userTestIdEmail: string;

describe('Create User Controller', () => {

  beforeAll(async () => {
    connection = await createConnection('localhost', true);
    await connection.runMigrations();

    userTestIdEmail = uuidV4();
  });

  afterAll(async () => {
    await connection.query(
      `DELETE FROM USERS WHERE email = '${userTestIdEmail}@mail.com'`,
    );
    await connection.close();
  });

  it('should be able to create a new user', async() => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: `Create User Test ${userTestIdEmail}`,
        email: `${userTestIdEmail}@mail.com`,
        password: '123456'
      });
    expect(response.status).toBe(201);
  })
})
