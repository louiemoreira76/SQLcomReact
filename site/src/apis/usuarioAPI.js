import axios from "axios";

const api = axios.create({ //caso tenha que usar outra rota um dia ({objeto})
    baseURL: 'http://localhost:5000'    //só alterar aqui na url base 
})            

export async function login(email, senha){

    const r = await api.post('/usuario/login', {
         email: email, 
         senha: senha
        });//variavel de estado
        //se tem await tem async, pegando a resposta na variavel respnse,ai aguarda a resposta do axios chamando a api no verbo get, e o endereço 
        return r.data; //apenas retorna o conteudo
    }

