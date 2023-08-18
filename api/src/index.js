import 'dotenv/config'
import { conx } from './repository/connecion.js';

import express from 'express';
import cors from 'cors'

import usuarioController from './controller/UsuarioController.js';

const server = express();
server.use(cors());
server.use(express.json());

//configuração dos end points 
server.use(usuarioController);

server.listen(process.env.PORT, () => console.log(`API mucho loka Conectada! ${process.env.PORT}`));
