import { login } from '../repository/usuarioRepository.js'

import { Router } from "express";
const server = Router();

server.post('/usuario/login', async (req, resp) => {
    try{
        const { email, senha } = req.body; //ojeto

        const resposta = await login(email, senha); // enviando para função login (detalhe como é função async coloca await); retorna em linhas

        if (!resposta){
            throw new Error('Credenciais invalidas');
        }

        resp.send(resposta) //email e id não é array
    }
    catch (err){
        resp.status(400).send({
            erro: err.message // lá do if aí em cima
        })
    }
})
export default server;