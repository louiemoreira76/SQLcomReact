import 'dotenv/config'
import { conx } from './repository/connecion.js';

import express from 'express';
import cors from 'cors'

import usuarioController from './controller/UsuarioController.js';
import filmeController from './controller/filmeController.js';

const server = express();
server.use(cors());
server.use(express.json());

//liberar a arquivos da image
server.use('/tools/image', express.static('tools/image'));

//configuração dos end points 
server.use(usuarioController);
server.use(filmeController);

server.listen(process.env.PORT, () => console.log(`API mucho loka Conectada! ${process.env.PORT}`));
