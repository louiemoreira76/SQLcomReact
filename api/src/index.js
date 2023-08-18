import 'dotenv/config'
import { conx } from './repository/connecion.js';

import express from 'express';
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());

server.listen(process.env.PORT, () => console.log(`API mucho loka Conectada! ${process.env.PORT}`));
