import request from 'supertest';

import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import { app } from '../../../../app';
import { Connection } from 'typeorm';

import createConnection from '../../../../database';
import { User } from '@modules/users/entities/User';

let connection: Connection;
let userTest: User;

describe('Get Statement Operation Controller', () => {

  beforeAll(async () => {
    connection = await createConnection('localhost', true);
    await connection.runMigrations();
    const id = uuidV4();

    userTest = {
      id,
      name: `Get Statement Operation Test ${id}`,
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
      `DELETE FROM STATEMENTS WHERE user_id = '${userTest.id}'`,
    );
    await connection.query(
      `DELETE FROM USERS WHERE id = '${userTest.id}'`,
    );
    await connection.close();
  });

  it('should be able to get a statement operarion', async() => {
    const responseToken = await request(app)
      .post('/api/v1/sessions')
      .send({
        email: userTest.email,
        password: userTest.password
      });

    const { token } = responseToken.body;

    const statementCreatedResponse = await request(app)
    .post('/api/v1/statements/deposit')
    .send({
      amount: 100,
      description: 'deposit $ 100'
    })
    .set({
      Authorization: `Bearer ${token}`,
    });

    const idStatement = statementCreatedResponse.body.id;

    const response = await request(app)
    .get(`/api/v1/statements/${idStatement}`)
    .set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(idStatement);
  })
})
