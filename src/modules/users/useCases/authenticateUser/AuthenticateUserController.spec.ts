import request from 'supertest';

import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import { app } from '../../../../app';
import { Connection } from 'typeorm';

import createConnection from '../../../../database';
import { User } from '@modules/users/entities/User';

let connection: Connection;
let userTest: User;

describe('Authenticate User Controller', () => {

  beforeAll(async () => {
    connection = await createConnection('localhost', true);
    await connection.runMigrations();

    const id = uuidV4();

    userTest = {
      id,
      name: `Authenticate User Test ${id}`,
      email: `${id}@mail.com`,
      password: 'password123',
      created_at: new Date(),
      updated_at: new Date(),
      statement: []
    }

    const password = await hash(userTest.password, 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, created_at, updated_at)
           VALUES('${userTest.id}', '${userTest.name}', '${userTest.email}',
           '${password}', 'now()', 'now()')`,
    );

  });

  afterAll(async () => {
    await connection.query(
      `DELETE FROM USERS WHERE id = '${userTest.id}'`,
    );
    await connection.close();
  });

  it('should be able to authenticate a user', async() => {

    const response = await request(app)
      .post('/api/v1/sessions')
      .send({
        email: userTest.email,
        password: userTest.password
      });

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  })
})
