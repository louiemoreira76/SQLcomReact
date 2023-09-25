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

    return (
        <main className='page page-consultar'>
            <Menu selecionado='consultar'/>
            <div className='container'>
                <Cabecalho />
                
                <div className='conteudo'>

                    <div className='caixa-busca'>
                        <input type="text" placeholder='Buscar filmes por nome' value={filtro} onChange={e => setFiltro(e.target.value)}  onKeyDown={Enter}/>
                        <img id='pro' src='/assets/images/procurar.png' alt='buscar' onClick={filtrar}/>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>IDENTIFICAÇÃO</th>
                                <th>FILME</th>
                                <th>AVALIAÇÃO</th>
                                <th>LANÇAMENTO</th>
                                <th>DISPONÍVEL</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                        {/*para mapear um arry em uma tag ou bloco jsx usa o MAP; função anonima que recebe o item de parametro*/}
                        {filmes.map(item => (
                            <tr key={item.id}> {/*parar jsx saber direnciar no mapeamento*/}
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.avaliacao}</td>
                                <td>{item.lancamento.substr(0, 10)}</td> {/*substr(0, 10) esse */}
                                <td>{item.disponivel ? 'Sim' : 'Não'}</td>  {/*não se retorna valor boleno no jsx ent faça isso*/}
                                <td>
                                    <img id='lapis' src='/assets/images/icon-editar.png' alt='editar' onClick={() => editarFilme(item.id)}/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <img id='lixo' src='/assets/images/lixo.png' alt='remover' onClick={() => RemoverFilme(item.id, item.nome)} />
                                </td>
                        </tr>  
                        ))}
                            <tr>
                                <td>#01</td>
                                <td>Harry Potter e a Pedra Filosofal</td>
                                <td>8,0</td>
                                <td>04/01/05</td>
                                <td>Sim</td>
                                <td>
                                    <img id='lapis'  src='/assets/images/icon-editar.png' alt='editar' />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <img id='lixo' src='/assets/images/lixo.png' alt='remover' />
                                </td>
                            </tr>
                          
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </main>
    )
}