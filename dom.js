var readDirFiles = require('read-dir-files'),
     select = require('soupselect').select,
     fs = require('fs'),
    _ = require('underscore'),
    htmlparser = require("htmlparser"),
    handler,
    methods,
    parser,
    parsedFiles,
    files = [];

readDirFiles.list('Famous.docset/Contents/Resources/Documents',function (err,filenames) {
  if (err) {
    return console.dir(err);
  }
  //This concat apply merges the two arrays files and filename to one single object key being an index starting at 0 value being the file
    files = files.concat.apply(files,filenames);
    fileReader(files)
 });


function fileReader(file) {
    console.log('starting to check');
    var fileNamesArray = (_.values(file))
    //console.log(fileNamesArray)

    _.each(fileNamesArray,function(index) {
      console.log(index)
    if (index === ' ' || index ==='/') {

      }else {
        fs.readFile(index, 'utf-8',function (err,data) {
          if (err) {
            console.log(err)
          }
           htmlparse(data)
        });
      }
     });
}


function htmlparse (file) {
 handler = new htmlparser.DefaultHandler( function (err,dom) {
   if (err) {
     console.log(err)
   }else{
   var methods = select(dom, 'a.method-tag');
   console.log(methods)
   _.each(methods, function (method) {
       console.log("Method name is" + " " + method.attribs.name)
     });
   }
 });

parser = new htmlparser.Parser(handler);
parser.parseComplete(file);
};








