'use strict';
import config from '../common/config'
import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from '../components/CommentBox';

let attachElement = document.getElementById('react-app');
var data = [
    {id: 1, author: "Pete Hunt", text: "This is one comment--"},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment--"}
];
ReactDOM.render(<CommentBox data={data} />, attachElement); // 实例化根组件，并启动应用

