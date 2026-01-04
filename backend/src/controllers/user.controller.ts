import { Request, Response } from 'express';
import { users } from '../data/users';
import { userSchema } from '../schemas/user.schema';
import { randomUUID } from 'crypto';

export function store(req: Request, res: Response) {
  const validation = userSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      errors: validation.error.format(),
    });
  }

    const { email } = validation.data;

  // regra: email único
  const emailExists = users.some(user => user.email === email);

  if (emailExists) {
    return res.status(400).json({
      errors: {
        email: {
          _errors: ['Este e-mail já está cadastrado'],
        },
      },
    });
  }

  const user = {
    ...validation.data,
    id: randomUUID(),
  };

  users.push(user);

  return res.status(201).json(user);
}

export function index(req: Request, res: Response) {
  return res.json(users);
}


//update controller
export function update(req: Request, res: Response) {
  const { id } = req.params as { id: string };

  const validation = userSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      errors: validation.error.format(),
    });
  }

  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // regra de email único (ignorando o próprio usuário)
  const emailExists = users.some(
    user => user.email === validation.data.email && user.id !== id
  );

  if (emailExists) {
    return res.status(400).json({
      errors: {
        email: { _errors: ['Este e-mail já está em uso'] },
      },
    });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...validation.data,
    id,
  };

  return res.json(users[userIndex]);
}

//delete controller
export function destroy(req: Request, res: Response) {
  const { id } = req.params;

  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  users.splice(userIndex, 1);

  return res.status(204).send();
}
