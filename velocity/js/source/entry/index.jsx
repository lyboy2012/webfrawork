'use strict';
import config from '../common/config'
import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from '../components/CommentBox';

let attachElement = document.getElementById('react-app');

ReactDOM.render(<CommentBox />, attachElement); // 实例化根组件，并启动应用

