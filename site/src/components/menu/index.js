import './index.scss'

import storage from 'local-storage'

import { useNavigate } from 'react-router-dom'

export default function Index() {

    const navigate = useNavigate();

    function sairClick(){   // função para remover o login do usuario  amarzenamento local
        storage.remove('usuario-logado');
        navigate('/') //que é o login
    }

    return (
        <nav className="comp-menu">
            <div>
                <div className='logo'>
                    <img src="/assets/images/logo1.png" alt="logo" />
                    <div>Portifolio.me</div>
                </div>

                <div className='menu-items'>
                    <div>
                        <img src="/assets/images/pagina-inicial.png" alt="home" />
                        <div>Home</div>
                    </div>
                    <div>
                        <img src="/assets/images/botao-adicionar.png" alt="cadastrar" />
                        <div>Cadastrar</div>
                    </div>
                    <div>
                        <img src="/assets/images/procurando.png" alt="consultar" />
                        <div>Consultar</div>
                    </div>
                </div>
            </div>

            <div className='menu-items'>
                <div onClick={sairClick}>
                    <img src="/assets/images/saida.png" alt="consultar" />
                    <div>Sair</div>
                </div>
            </div>
        </nav>
    )
}