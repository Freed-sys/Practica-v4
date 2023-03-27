import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';


const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar',  'Content-Type': 'application/json'}
  
});


instance.interceptors.request.use(config => {
  
  const token = localStorage.getItem('TOKEN_APP');

  if (token != null) {
    config.headers.Authorization = `bearer ${token}`;
  } else {
    config.headers.Authorization = null;
  }

  return config;
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </React.StrictMode>
);

export default instance;