import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login'
import Home from './pages/home'
import Cadastrar from './pages/register'
import Consultar from './pages/consult'
import ConsultarCard from './pages/consultCard'
import Detalhe from './pages/detalhe'


export default function Routess(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/admin' element={<Home />} />
                <Route path='/admin/cadastrar' element={<Cadastrar />} />
                <Route path='/admin/consultar' element={<Consultar />} />
                <Route path='/admin/consultarCard' element={<ConsultarCard />} />
                
                <Route path='/admin/detalhe/:idParam' element={<Detalhe />} /> 
                <Route path='/admin/alterar/:idParam' element={<Cadastrar />} /> {/*Parametro de rota*/}
            </Routes>
        </BrowserRouter>
    )
}