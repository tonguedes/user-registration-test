import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  age: z.number().min(18, 'Idade deve ser maior ou igual a 18'),
});
