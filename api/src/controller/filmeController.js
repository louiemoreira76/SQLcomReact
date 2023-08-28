import { inserirFilme } from '../repository/filmeRepository.js';

import { Router } from 'express';
const server = Router();

server.post('/filme', async(req, resp) => {
    try{
        const filmeParaInserir = req.body  //só colocou o filme pq é parametro de corpo completo

        if(!filmeParaInserir.nome)
            throw new Error('Nome do filme inserido é obrigatorio');

        if(!filmeParaInserir.sinopse)
        throw new Error('Sinopse do filme inserido é obrigatorio');

        if(!filmeParaInserir.avaliacao)
            throw new Error('Avaliação do filme inserido é obrigatorio');

        if(!filmeParaInserir.lancamento)
         throw new Error('Lançamento do filme inserido é obrigatorio');

         if(!filmeParaInserir.disponivel)
         throw new Error('Disponivel do filme inserido é obrigatorio'); 

         if(!filmeParaInserir.usuario)
        throw new Error('Usuario não logado!')

        const RepositoryInseridoF = await inserirFilme(filmeParaInserir);
       
        resp.send(RepositoryInseridoF);
    }

    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})



export default server