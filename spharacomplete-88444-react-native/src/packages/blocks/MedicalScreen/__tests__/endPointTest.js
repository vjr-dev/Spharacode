const { exec } = require("child_process");
let config = require('../src/config')
let host = require('../../../framework/src/config').baseURL.replace("http://", '').replace("https://", '');


let cmd = `cd ../../../../ && node endPointTest.js --host ${host} --path ${config.endPoint} --method GET`

console.log(cmd);
