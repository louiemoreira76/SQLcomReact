import { login } from '../../apis/usuarioAPI'; //apis

import storage from 'local-storage';

import { useState, useRef, useEffect } from 'react'; //useRef vai criaruma referencia para usar loading bar
import LoadingBar from 'react-top-loading-bar'

import { useNavigate } from 'react-router-dom';

import './index.scss'

export default function Index() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setmsgErro] = useState('');
    const [carregando, setCarregando] = useState(false); //falso nada carregando(ent pode clicar), true algo carregando(bloqueado)

    const navigate = useNavigate(); 
    const ref = useRef();

    useEffect(() => {  //para que qnd o usuario já estiver logado ele vá direto para admin 
        if (storage('usuario-logado')){
            navigate('/admin');
        }
    }, [])

    async function entrarClick() { //axios faz uma chamada acicrona
    
        ref.current.continuousStart();
        setCarregando(true);

    try{
        const r = await login(email, senha);

        storage('usuario-logado', r) //para armazenar no broser chama o storage passado 2 parametros = 1° nm da chave 2° valor da var
        
        setTimeout(() => { //ELA passa um tempo, e só vai executar essa função qnd bater no cronomento  
            navigate('/admin');
        }, 3000) //qts segundos dps para chamar a função
        

    } //Todas as respostas da api podem ser acesadas pelo APIresponse.data + a onde vc quercolocar a resposta
    catch (err) {
        ref.current.complete(); //para comletar a barra logo qnd digita algo errado
       setCarregando(false);

        if (err.response.status === 401) {
        setmsgErro(err.response.data.erro);
    }
        }
}

    return (
        <main className='page page-login'>
            <LoadingBar color='#f11946' ref={ref} /> {/*Sempre abaixo da div principal*/}

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
                        <button className='btn-black'  onClick={entrarClick} disabled={carregando}  >ENTRAR</button> {/*Falso não tem nada carregando*/}
                    </div>
                    <div className='form-entrar invalido'>
                        {erro} {/*Falta consertar*/}
                    </div>
                </div>

            </section>
        </main>
    )
}