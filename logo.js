var fs = require('fs')
var path = require('path');
var os = require('os');

class Log{
    constructor(){
    }
}
Log.prototype.open = function(){
    this.logStrem = fs.createWriteStream('./log/log.txt');
}
Log.prototype.add = function(param){
    this.logStrem.write( param + '\r\n', "UTF8");
}
Log.prototype.close = function(){
    this.logStrem.end();
}
Log.prototype.clear = function(){

}


module.exports = Log;
