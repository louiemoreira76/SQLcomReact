import axios from "axios";

const api = axios.create({ //caso tenha que usar outra rota um dia ({objeto})
    baseURL: 'http://localhost:5000'    //só alterar aqui na url base 
})            

export async function CadastrarFilme(nome, avaliacao, lancamento, disponivel, sinopse, usuario) {
    const resposta = await api.post('/filme', {
        nome: nome,
        sinopse: sinopse,
        avaliacao: avaliacao,
        disponivel: disponivel,
        lancamento: lancamento,
        usuario: usuario
    })
    return resposta.data; //lebrando que o data é o que a api da como respsota
}

export async function EnviarImagemF(id, imagem){
// qnd se tem um end point q recebe imagem,pdf e qualquer outor tipo de arquivo enviamos num objeto FORM DATA; lá do thunderclient form
    const formData = new FormData();  //new é responsavel por criar um objeto
    formData.append('capa', imagem); //passa o nome da imagem enviada e o imagem em si

    const resposta = await api.put(`/filme/${id}/imagem`, formData, {
        headers:{
            "Content-Type": "multipart/form-data", ///////////23:00/////////////////
        },
    });
    return resposta.status //não tem conteudo ele retorna 204
}