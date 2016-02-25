'use strict';
import config from '../common/config'
//alert(config.NUM);
console.log($('h1').text()+'-------------- index'+config.NUM);

const names = {"a":"a","b":"b"};
function a(){
	let arrNames = Array.prototype.slice(arguments,0);

	$('h1').text(Object.prototype.toString.call(arrNames)==='[object Array]')
}
a(1,2,3)
