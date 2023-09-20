import './index.scss'

import storage from 'local-storage'

import { useNavigate, Link } from 'react-router-dom'

export default function Index(props) { //props pode ser chamdo em qualquer lugar 

    const navigate = useNavigate();

    function sairClick(){   // função para remover o login do usuario  amarzenamento local
        storage.remove('usuario-logado');
        navigate('/') //que é o login
    }

    function verificarMenuSelecionado(menu){
        if (menu === props.selecionado)
            return 'selecionado'   // que é oq cai dentro da função é o class selecionado
    
        else
            return '';
        
    }

    return (
        <nav className="comp-menu">
            <div>
                <div className='logo'>
                    <img src="/assets/images/logo1.png" alt="logo" />
                    <div>Portifolio.me</div>
                </div>

                <div className='menu-items'>
                    <Link to='/admin' className={verificarMenuSelecionado('home')}>
                        <img src="/assets/images/pagina-inicial.png" alt="home" />
                        <div>Home</div>
                    </Link>
                    <Link to='/admin/cadastrar'  className={verificarMenuSelecionado('cadastrar')}>
                        <img src="/assets/images/botao-adicionar.png" alt="cadastrar" />
                        <div>Cadastrar</div>
                    </Link>
                    <Link to='/admin/consultar' className={verificarMenuSelecionado('consultar')}>
                        <img src="/assets/images/procurando.png" alt="consultar" />
                        <div>Consultar</div>
                    </Link>
                </div>
            </div>

            <div className='menu-items'>
                <div className='oi' onClick={sairClick}>
                    <img src="/assets/images/saida.png" alt="consultar" />
                    <div>Sair</div>
                </div>
            </div>
        </nav>
    )
}