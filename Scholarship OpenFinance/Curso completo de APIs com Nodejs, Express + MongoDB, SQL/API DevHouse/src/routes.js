// Importação das dependências
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

// Importação dos controllers
import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import DashboardController from './controllers/DashboardController';
import ReserveController from './controllers/ReserveController';

// Inicialização do Router do Express
const routes = new Router();
// Configuração do multer para upload de arquivos
const upload = multer(uploadConfig);

// Rotas de autenticação
routes.post('/sessions', SessionController.store);

// Rotas de casas
routes.get('/houses', HouseController.index); // Lista todas as casas
routes.post('/houses', upload.single('thumbnail'), HouseController.store); // Cria nova casa
routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update); // Atualiza casa
routes.delete('/houses/:house_id', HouseController.destroy); // Deleta casa

routes.get('/dashboard', DashboardController.show);

routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves', ReserveController.index);
routes.delete('/reserves/cancel', ReserveController.destroy);

// Exporta as rotas configuradas
module.exports = routes;