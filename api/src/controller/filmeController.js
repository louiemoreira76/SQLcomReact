import { alterarImagem, inserirFilme, listarTodosFilmes, buscarPorID, buscarPorNome, deletarFilme, alterarFilme} from '../repository/filmeRepository.js';

import multer from 'multer'; // para conseguir enviar images ao DB
import { Router } from 'express';
const server = Router();

                                //tenta colocar dps a rota completa
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

         if(filmeParaInserir.disponivel == undefined)
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

        if (!req.file)
        throw new Error('Precisa escolher a capa do filme')

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

server.get('/filme', async (req, resp) => { //não precisa de requisisão
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

        if(resposta.length == 0){ //! = nula ou não definida
            resp.status(404).send([]) //forma 2 de algo não encontrado
        }
        else
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

server.delete('/filme/:id', async (req, resp) => {
    try{
        const { id } = req.params;

        const resposta = await deletarFilme(id);

        if(resposta != 1) // validação
            throw new Error('Filme não pode ser removido!');

        resp.status(204).send();
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.put('/filme/:id', async (req, resp) => {
    try{
        const { id } = req.params;
        const filme = req.body;

        if(!filme.nome)
            throw new Error('Nome do filme inserido é obrigatorio');

        if(!filme.sinopse)
        throw new Error('Sinopse do filme inserido é obrigatorio');

        if(!filme.avaliacao)
            throw new Error('Avaliação do filme inserido é obrigatorio');

        if(!filme.lancamento)
         throw new Error('Lançamento do filme inserido é obrigatorio');

         if(filme.disponivel == undefined)
         throw new Error('Disponivel do filme inserido é obrigatorio'); 

         if(!filme.usuario)
        throw new Error('Usuario não logado!')

        const resposta = await alterarFilme(id, filme);

        if(resposta != 1)
        throw new Error('Filme não pode ser alterado!');
        
        else
            resp.status(204).send();
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})
export default server