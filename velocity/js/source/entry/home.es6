import config from '../common/config'
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from '../components/Hello';

let attachElement = document.getElementById('react-app');

ReactDOM.render(<Hello phrase="ES6"/>, attachElement); // 实例化根组件，并启动应用