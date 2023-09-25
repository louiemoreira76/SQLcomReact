import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'
import Detalhe from '../../components/detalhe'

import { useParams } from 'react-router-dom'

import './index.scss'
import { useEffect, useState } from 'react'

import { BuscarFilmeID } from '../../apis/filmeAPI'
import { set } from 'local-storage'

export default function Index() {

    const [filme, setFilme] = useState({}); //{} significa que inicio como objeto vazio

    const { idParam } = useParams(); //parametro de rota que no routes

    useEffect(() => { //ser executada apenas qnd abrir a pagina
        carregarFilme();
    }, []);

    async function carregarFilme(){
        const resposta = await BuscarFilmeID(idParam);
        setFilme(resposta); // chamado do id
    }

    return (
        <main className='page page-detalhe'>
            <Menu />
            <div className='container'>
                <Cabecalho />
                
                <div className='conteudo'> 
                    <Detalhe nmParametro={filme}/> {/*Enviando dados para esse componente (no caso a variavel de estado) q é o props*/}
                </div>
            </div>
        </main>
    )
}