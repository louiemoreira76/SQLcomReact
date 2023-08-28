import { conx } from "./connecion.js";

export async function inserirFilme (filme){ //não nome, genero, avaliação etc pq é parametro de corpo inteiro
    const comando = `INSERT INTO tb_filmes (id_filme, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
	                            VALUES (?, '?', '?', ?, '?', ?);`

    const [rensposta] = await conx.query(comando, [filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel]);
    filme.id = rensposta.insertId;  //É o campo da chave primaria que foi inserido no id filme 
    
    return filme; //retornado todos os campos do rensposta + o id
}     
