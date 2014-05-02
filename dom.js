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
    //loop through all the values in this files object and take their value/filename 
    for (var i = 0, l = files.length; i < l; i ++) {
      var filenames = files[i];
    // remove all css and js files from the filename list
    if (filenames.substr(-1,1) ==='s' || filenames.substr(-1,1)==='/') {
        filenames = "" 
      }
      console.log(typeof filenames)
    //   fileReader(filenames);
      parsedFiles = []
      parsedFiles = parsedFiles.push(filenames)
    }
      console.log(typeof parsedFiles)
 });


function fileReader(file) {
  console.log(file)
  if (file === '') {
    return
    }
  fs.readFile(file, 'utf-8',function (err,data) {
    if (err) {
      console.log(err)
    }
     console.log(data)
  });
}


// function htmlparse (file) {
//  console.log(file)
//  handler = new htmlparser.DefaultHandler( function (err,dom) {
//    if (err) {
//      console.log(err)
//    }else{
//    methods = select(dom, 'a.method-tag');
//    console.log(methods)
//    methods_.each(function (method) {
//        sys.puts("Method name is" + " " + method.attribs.name)
//      });
//    }
//  });
//  
//parser = new htmlparser.Parser(handler);
//parser.parseComplete(file);
// };








