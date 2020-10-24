import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import Header from './componenets/heading.js'
import InputHandler from './componenets/inputHandler.js'
import Background from './greatWall.jpg'

ReactDOM.render(
    <div className='main' style={{backgroundImage: `url(${Background})`}}>
        <Header />
        <InputHandler />
    </div>
, document.getElementById('root'));