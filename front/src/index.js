import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

axios.interceptors.request.use(config=>{
  
  config.baseURL = "http://localhost:8000"
  
  const token = localStorage.getItem('TOKEN_APP');

  if(token!=null)
  {
    config.headers.Authorization =  `Bearer ${token}`;
  }else{
    config.headers.Authorization = null;
  }

 
  return config
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </React.StrictMode>
);

