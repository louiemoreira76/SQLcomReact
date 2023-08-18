import { conx } from './connecion.js';

export function login(email, senha){
    //console.log(email);
    //console.log(senha);
    const comando = 
   `SELECT 	id_usuario	id,
        nm_usuario	nome,
        ds_email	email
    FROM tb_usuario
    WHERE ds_email	=	?
    AND   ds_senha	=	? `

    const [linhas] = resposta = conx.query(comando, [email, senha]) // email e senha substitui as interrogações 
    //const linhas = resposta[0]; //posição 0 do array retorna as linhas do BD o resto é linguiça
   /// console.log(linhas[0]);    ou sem o [0]
    return linhas[0];
}