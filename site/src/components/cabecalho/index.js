import storage from 'local-storage'
import './index.scss'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Index() {

    const [usuario, setusuario] = useState('-');


    const navigate = useNavigate();

    //existe uma função inicial que cramos para nossa pagina, só qnd a paniga carrega pela primeira vez
    useEffect(() => {
        if (!storage('usuario-logado')){ //se essa tentativa de leitura n voltar algo = ai joga para pagina de login de volta
            navigate('/');
        }
        else{ // se não pega nome do usuario e coloca no front na pagina
            const nomeUsuario = storage('usuario-logado');
            setusuario(nomeUsuario.nome)
        }
    }, [])

    return (
        <header className='comp-cabecalho'>
            <div className='bem-vindo'>Seja bem-vindo, {usuario}!</div>
            <div>
                <div className='usuario'>
                    <span>{usuario[0].toUpperCase()}</span> {/*Para pegar apenas a primeira letra*/}
                </div>
            </div>
        </header>
    )
}