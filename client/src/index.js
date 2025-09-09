import React from 'react';
import ReactDOM from 'react-dom/client';
import    'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './dist/styles.css';  

import {BrowserRouter} from 'react-router-dom'


import {AuthProvider} from "./context/auth";
import {CartProvider} from "./context/cart"
import App from './App';
const firstWorld= 
<>
<AuthProvider>
 <CartProvider>
<BrowserRouter>
<App/>

</BrowserRouter>
</CartProvider>
</AuthProvider>

</>



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(firstWorld);