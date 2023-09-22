import { conx } from "./connecion.js";

export async function inserirFilme (filme){ //não nome, genero, avaliação etc pq é parametro de corpo inteiro
    const comando = `INSERT INTO tb_filmes (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
	                            VALUES (?, ?, ?, ?, ?, ?);`

    const [rensposta] = await conx.query(comando, [filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel]);
    filme.id = rensposta.insertId;  //É o campo da chave primaria que foi inserido no id filme 
    
    return filme; //retornado todos os campos do rensposta + o id
}     

///////////////////////////////////////////////////
export async function alterarImagem(imagem, id){
    const comando = `
    UPDATE tb_filmes
        SET img_filme   = ?
        WHERE   id_filme = ?
    `;
    
    const [resposta] = await conx.query(comando, [imagem, id]);
    return resposta.affectedRows // quantas linhas foram afetadas no DB, se retornar 1 certo se não errado
}

///////////////////////////////////////////////////
export async function listarTodosFilmes(){   //como é todos não precisa de parametro
    const comando = `
    SELECT id_filme     id,
    nm_filme         nome,
    vl_avaliacao     avaliacao,
    dt_lancamento    lancamento,
    bt_disponivel    disponivel
    FROM tb_filmes;`

    const [linhas] = await conx.query(comando) //não tem interogações por isso nada do lado de comando
    return linhas;
};

export async function buscarPorID(id){
    const comando = `
    SELECT id_filme     id,
    nm_filme         nome,
    vl_avaliacao     avaliacao,
    dt_lancamento    lancamento,
    bt_disponivel    disponivel
    FROM tb_filmes
    WHERE id_filme = ?`;
    const [linhas] = await conx.query(comando, [id]);
    return linhas[0];
};

export async function buscarPorNome(nome){
    const comando = `
    SELECT id_filme     id,
    nm_filme         nome,
    vl_avaliacao     avaliacao,
    dt_lancamento    lancamento,
    bt_disponivel    disponivel
    FROM tb_filmes
    WHERE nm_filme like ?`;
    const [linhas] = await conx.query(comando, [`%${nome}%`]);
    return linhas[0];
};


export async function deletarFilme(id){
    const comando =`
    DELETE FROM tb_filmes
        WHERE id_filme = ?`;
    const [resposta] = await conx.query(comando, [id]);
    return resposta.affectedRows;
};


export async function alterarFilme(id, filme){
    const comando =`
    UPDATE tb_filmes
    SET nm_filme = ?,
        ds_sinopse = ?,
        vl_avaliacao = ?,
        dt_lancamento = ?,
        bt_disponivel = ?,
        id_usuario =    ?
    WHERE   id_filme = 1`
    const [resposta] = await conx.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel,filme.usuario, id]);
    return resposta.affectedRows;
}