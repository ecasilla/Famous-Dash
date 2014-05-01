//var jsdom = require("jsdom");
//var window = jsdom.jsdom().parentWindow;
var fs = require('fs')


fs.readFileSync('/Famous.docset/Contents/Resources/Documents/Context.html',function(err,data){
if (err) 
  throw err;
  console.log(data);

});









