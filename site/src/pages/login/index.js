import { useState } from 'react';
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

import './index.scss'

export default function Index() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setmsgErro] = useState('');

    const navigate = useNavigate();

    async function entrarClick() { //axios faz uma chamada acicrona
    try{
        const r = await axios.post('http://localhost:5000/usuario/login', { email: email, senha: senha});//variavel de estado
        //se tem await tem async, pegando a resposta na variavel respnse,ai aguarda a resposta do axios chamando a api no verbo get, e o endereço 
        navigate('/admin');
    } //Todas as respostas da api podem ser acesadas pelo APIresponse.data + a onde vc quercolocar a resposta
    catch (err) {
       if (err.response.status === 401) {
        setmsgErro(err.response.data.erro);
    }
        }
}

    return (
        <main className='page page-login'>
            <section className="box-login">

                <div className="bem-vindo">
                    <img src="/assets/images/logo1.png" alt="logo" />
                    <h1> Seja Bem-vindo!</h1>
                </div>

                <div>
                    <div className='form-row'>
                        <label>E-mail:</label>
                        <input type='text' placeholder='Informe seu e-mail'  value={email}  onChange={e => setEmail(e.target.value)}/>
                                                {/*onChange=[QUANDO ALTERA] e = função que recebe o evento, para alterar a variavel de estado*/}
                    </div>
                    <div className='form-row'>
                        <label>Senha:</label>
                        <input type='password' placeholder='***'  value={senha} onChange={e => setSenha(e.target.value)}/> {/*e.target.value com isso vc tem acesso a esse valor*/}
                    </div>
                    <div className='form-entrar'>
                        <button className='btn-black'  onClick={entrarClick}   >ENTRAR</button> 
                    </div>
                    <div className='form-entrar invalido'>
                        {erro} {/*Falta consertar*/}
                    </div>
                </div>

            </section>
        </main>
    )
}