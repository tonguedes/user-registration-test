import { Router } from 'express';
import { store, index, update, destroy } from './controllers/user.controller';

const routes = Router();

routes.post('/users', store);
routes.get('/users', index);
routes.put('/users/:id', update);
routes.delete('/users/:id', destroy);


export default routes;
