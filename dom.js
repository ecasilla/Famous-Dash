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
    var fileNamesArray = (_.values(file))
      pathStorage(fileNamesArray)
    _.each(fileNamesArray,function(index) {
    if (index === ' ' || index ==='/') {
      //console.log(index)
      }else {
        fs.readFile(index, 'utf-8',function (err,data) {
          if (err) {
            console.log(err + 'fileReader')
          }
           htmlparse(data,fileNamesArray)
        });
      }
     });
}


function htmlparse (file, fileNamesArray) {
 handler = new htmlparser.DefaultHandler( function (err, dom) {
   if (err) {
     console.log(err + 'htmlparser')
   }else{
   var methods = select(dom, 'a.method-tag');
   _.each(methods, function (method) {
      console.log(method.attribs.name)
     });
   }
 });
parser = new htmlparser.Parser(handler);
parser.parseComplete(file);
};



function pathStorage (arrOfFiles) {
  console.log(arrOfFiles)
}




