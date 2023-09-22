import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';

import storage from 'local-storage'; //pegar o usuario
import { CadastrarFilme, EnviarImagemF} from '../../apis/filmeAPI'; //APIS

import './index.scss';
import { useState } from 'react';

import { toast } from 'react-toastify';



export default function Index() {
    const [nome, setNome] = useState('');    //value={nome} se vincula ao input e => setNome(e.target.value) e aqui pega esse valor
    const [sinopse, setSinopse] = useState('');
    const [avaliacao, setAvaliacao] = useState(0);
    const [lancamento, setLancamento] = useState('');
    const [disponivel, setDisponivel] = useState(false);
    const [imagem, setImagem] = useState('');

    async function Salavarclick(){
        
        try{
            const usuario = storage('usuario-logado').id; ///pegando só ampo id do objeto usuario-logado

            console.log('Dados enviados para a API:', { nome, sinopse, avaliacao, disponivel, lancamento, usuario });

            //console.log('Nome:', nome);
            //console.log('Sinopse:', sinopse);
            //console.log('Avaliação:', avaliacao);
            //console.log('Lançamento:', lancamento);
           //console.log('Disponível:', disponivel);
           //console.log('Usuário:', usuario);

            const r = await CadastrarFilme(nome, avaliacao, lancamento, disponivel, sinopse, usuario);

            toast.success('Filme Cadastrado com sucesso📽️!');
        }
        catch (err) {
            if (err.response) {
              toast.error(`Erro ${err.response.status}: ${err.response.data.erro}`);
            } else {
              toast('Erro desconhecido ao cadastrar o filme.');
            }
          }
    }

    return (
        <main className='page page-cadastrar'>
            <Menu selecionado='cadastrar'/>
            <div className='container'>
                <Cabecalho />
                
                <div className='conteudo'>
                    <section>
                        <h1 className='titulo'><span>&nbsp;</span> Cadastrar Novo Filme</h1>

                        <div className='form-colums'>
                            <div>
                                <div className='upload-capa'>
                                    <img src="/assets/images/icon-upload.svg" alt="" />
                                </div>
                            </div>
                            <div>
                                <div className='form-row'>
                                    <label>Nome:</label>
                                    <input type='text' placeholder='Nome do filme' value={nome} onChange={e => setNome(e.target.value)} />
                                </div>
                                <div className='form-row'>
                                    <label>Avaliação:</label>
                                    <input type='number' placeholder='0' value={avaliacao} onChange={e => setAvaliacao(e.target.value)}/>
                                </div>
                                <div className='form-row'>
                                    <label>Lançamento:</label>
                                    <input type='date' value={lancamento} onChange={e => setLancamento(e.target.value)}/>
                                </div>
                                <br />
                                <div className='form-row'>
                                    <label></label>                  {/*checked pq é checkbox*/}      
                                    <input type='checkbox' checked={disponivel} onChange={e => setDisponivel(e.target.checked)}/> &nbsp; Disponível
                                </div>
                            </div>
                            <div>
                                <div className='form-row' style={{alignItems: 'flex-start'}}>
                                    <label style={{marginTop: '13px'}}>Sinopse:</label>
                                    <textarea placeholder='Sinopse do filme' value={sinopse} onChange={e => setSinopse(e.target.value)}/>
                                </div>
                                <br />
                                <br />
                                <div className='form-row'>
                                    <label></label>
                                    <div className='btnSalvar'>
                                        <button onClick={Salavarclick}>SALVAR</button>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}