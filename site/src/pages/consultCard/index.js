import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'

import './index.scss'

import {BuscarPorNomeFilmes, listarTodosFilmes , ExcluirFilme} from '../../apis/filmeAPI'
import { useEffect, useState } from 'react'

import { confirmAlert } from 'react-confirm-alert'; 
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'



export default function Index() {

    const navigate = useNavigate();

    const [filmes, setFilmes] = useState([]);
    const [filtro, setFiltro] = useState('');
    
    async function filtrar(){  
        const resposta = await BuscarPorNomeFilmes(filtro);
        setFilmes(resposta)
    }

    async function Enter(event) {
        if (event.key === "Enter") {
            const resposta = await BuscarPorNomeFilmes(filtro);
            setFilmes(resposta)
        }
      }

    async function CarregarTodosFilmes(){
        const resposta = await listarTodosFilmes();
        setFilmes(resposta);
        console.log(resposta)
    }
    //Executar comandos apenas qnd a pagina é abeta pela primeira vez
    useEffect(() => {
        CarregarTodosFilmes();
    }, [])

    async function RemoverFilme(id, nome){

        confirmAlert({
            title: 'Remover Filme',
            message: `Você tem certeza que quer fazer isso? Excluir o filme ${nome}.`,
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                    const resposta = await ExcluirFilme(id, nome);
                        if (filtro === "")
                            CarregarTodosFilmes();

                        if (filtro !== "")
                            CarregarTodosFilmes();
                        else
                            filtrar();
                            toast.dark("Filme removido💀")
                }
              },
              {
                label: 'Não'
              }
            ]
          });
    }
    function editarFilme (id){
        navigate(`/admin/alterar/${id}`); // para ir para pagina de editar filme
    }

    function abrirDetalhes (id){
        navigate(`/admin/detalhe/${id}`)
    }

    return (
        <main className='page page-consultar'>
            <Menu />
            <div className='container'>
                <Cabecalho />
                
                <div className='conteudo'>

                    <div className='caixa-busca'>
                        <input type="text" placeholder='Buscar filmes por nome' value={filtro} onChange={e => setFiltro(e.target.value)}  onKeyDown={Enter}/>
                        <img id='pro' src='/assets/images/procurar.png' alt='buscar' onClick={filtrar}/>
                    </div>
                    


                    <div className='card-container'>
                        {filmes.map(item =>

                            <div className='comp-card'>
                            <div className='card' key={item.id} onClick={() => abrirDetalhes(item.id)}>
                                <div className='acoes'>

                                    <img src='/assets/images/icon-editar.png' alt='editar' onClick={e => { e.stopPropagation(); editarFilme(item.id) } }/>
                                    
                                    <img src='/assets/images/lixo.png' alt='remover' onClick={e => { e.stopPropagation(); RemoverFilme(item.id, item.nome) } }/>
                                    
                                </div>
                                <div>
                                    <div className='sigla'>{item.nome.substr(0, 1)}</div>
                                    <div className='filme'>{item.nome}</div>
                                    <div className='lancamento'>{item.lancamento.substr(0, 10)}</div>
                                </div>
                                <div>
                                    <div className='avaliacao'>AVALIAÇÃO: {item.avaliacao}</div>
                                    <div className='disponivel'>DISPONÍVEL: {item.disponivel ? 'Sim' : 'Não'}</div>
                                </div>
                            </div>
                        </div>
                        )}

                        
                        
                        
                    </div>


                    
                </div>
            </div>
        </main>
    )
}