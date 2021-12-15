import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.css';
import Providers from './Providers';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Providers>
    <App />
    <ToastContainer />
  </Providers>,
  document.getElementById('root')
);

reportWebVitals();
