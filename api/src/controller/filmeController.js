import { alterarImagem, inserirFilme, listarTodosFilmes, buscarPorID, buscarPorNome } from '../repository/filmeRepository.js';

import { Router } from 'express';
const server = Router();

import multer from 'multer';
const upload = multer({dest: 'tools/image'}); //obejeto javasript '{}', dest é para onde vai subir os arquivos

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

//outro end poin,t da imagem
server.put('/filme/:id/imagem', upload.single('capa'), async (req, resp) => {
    try{
        const { id } = req.params;
        const imagem = req.file.path;    // constante para caminho da imagem

        const resposta = await alterarImagem(imagem, id);
        if(resposta != 1) // validação
            throw new Error('A imagem não pode ser salva')

        resp.status(204).send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})
///////////////

server.get('/filme', async (req, resp) => { 
    try{
        const resposta = await listarTodosFilmes();
        resp.send(resposta);
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/filme/busca', async (req, resp) => { 
    try{
        const { nome } = req.query;
        const resposta = await buscarPorNome(nome);

        if(!resposta.length == 0){ //! = nula ou não definida
            resp.status(404).send([]) //forma 2 de algo não encontrado
        }
        resp.send(resposta);
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

//:id é parametro deixa por ultimo a ordem dos ends points é importante
server.get('/filme/:id', async (req, resp) => { 
    try{
        const { id } = req.params;
        const resposta = await buscarPorID(id);

        if(!resposta){
            throw new Error('Filme Não Encontrado!!!')//forma um de algo não encontrado
        }
        resp.send(resposta);
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})



export default server