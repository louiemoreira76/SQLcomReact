import './index.scss';
import { BuscarImagem } from '../../apis/filmeAPI'

export default function Index(props) {//props = nmParametro 
    return (
        <div className='comp-detalhe'>
            <img src={BuscarImagem(props.nmParametro.imagem)} alt='' />
            <div className='box-info'>
                <h1>{props.nmParametro.nome}</h1>
                <div className='info'>
                    <h3>Lançamento</h3>
                    <p>{props.nmParametro.lancamento && props.nmParametro.lancamento.substr(0, 10)}</p> {/*&& então = não estiver nulo ent executa o 2° */}
                </div>
                <div className='info'>
                    <h3>Sinopse</h3>
                    <p className='sinopse'>{props.nmParametro.sinopse}</p>
                </div>
                <div className='info'>
                    <h3>Avaliação</h3>
                    <p>{props.nmParametro.avaliacao}</p>
                </div>
                <div className='info'>
                    <h3>{props.nmParametro.disponivel ? 'Disponivel' : 'Indisponivel'}</h3>
                </div>
            </div>
        </div>
    )
}// <p>{props.nmParametro.lancamento.substr(0, 10)}</p> não dá para usar assim direto pois esta vazio antes dos dados chegar ent...