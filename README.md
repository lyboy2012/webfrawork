# webfrawork
前端框架
基于webpack gulp 利用babel 编译es6。

打开 node_modules\gulp-rev\index.js

第140行 manifest[originalFile] = revisionedFile; 
更新为: manifest[originalFile] = originalFile + '?v=' + file.revHash;

打开 nodemodules\gulp-rev\nodemodules\rev-path\index.js

10行 return filename + '-' + hash + ext; 
更新为: return filename + ext;

打开 node_modules\gulp-rev-collector\index.js

31行 if ( path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' ) !== path.basename(key) ) { 
更新为: if ( path.basename(json[key]).split('?')[0] !== path.basename(key) ) {