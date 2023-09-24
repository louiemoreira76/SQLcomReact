import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Routess from './Routes.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; //tem que inportar aqui para funcionar em todos os arquivos 


import 'react-confirm-alert/src/react-confirm-alert.css'; //tem que inportar aqui para funcionar em todos os arquivos 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Routess />
  </React.StrictMode>
);
