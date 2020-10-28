import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import Header from './componenets/heading.js'
import InputHandler from './componenets/inputHandler.js'

ReactDOM.render(
    <div className='main-wrapper'>
        <div className='main'>
            <Header />
            <InputHandler />
        </div>
    </div>
, document.getElementById('root'));