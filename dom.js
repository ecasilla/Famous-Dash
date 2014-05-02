var readDirFiles = require('read-dir-files'),
    _ = require('underscore');
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

        console.log(filenames)
    }
 });








