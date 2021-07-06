import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStatementUseCase } from './CreateStatementUseCase';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
}

export class CreateStatementController {
  async execute(request: Request, response: Response) {
    const { id } = request.user;
    const { amount, description } = request.body;
    const { user_id } = request.params;

    const splittedPath = request.originalUrl.split('/')
    const indexPath = user_id ? splittedPath.length - 2 : splittedPath.length - 1;
    const type = splittedPath[indexPath] as OperationType;

    const createStatement = container.resolve(CreateStatementUseCase);

    const statement = await createStatement.execute({
      user_id: id,
      sender_id: user_id,
      type,
      amount,
      description
    });

    return response.status(201).json(statement);
  }
}
