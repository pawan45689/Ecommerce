import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import    'bootstrap/dist/css/bootstrap.min.css';
const img_1 ="logo192.png"
const myFirstElement =
<> <h1 style={{textAlign:'center'}} >Hello World!</h1>
 <p class='bg-info' > This is paragraph</p>
 <img src={img_1} alt='image_1'/>
 </>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myFirstElement);
 