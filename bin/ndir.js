
var ndir = require('ndir')
ndir.walk('./src/pages', function onDir(dirpath, files) {
  // console.log(files);
  for (var i = 0, l = files.length; i < l; i++) {
    var info = files[i];
    if (info[1].isFile()) {
      console.log(info[0]);
    }
  }
}, function end() {
  console.log('walk end.');
}, function error(err, errPath) {
  console.error('%s error: %s', errPath, err);
});