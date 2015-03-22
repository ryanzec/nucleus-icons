var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpConfig = require('../config.js');
var globArray = require('glob-array');
var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync(__dirname + '/../lib/jquery.js', 'utf-8');
var buildMetaDataFactory = require('build-meta-data');
var path = require('path');
var esrever = require('esrever');

gulp.task('svg-to-commonjs', 'Creates a commonjs compatible file that exports the svg in a JSON object', function(done) {
  var buildMetaData = buildMetaDataFactory.create(process.cwd() + '/gulp/build-meta-data/svg-to-commonjs.json');
  var files = globArray.sync(gulpConfig.sourceFiles.svg);
  var json = {};

  if(buildMetaData.hasChangedFile(files)) {
    files.forEach(function(filePath, key) {
      var fileName = path.basename(filePath).replace('.svg', '');

      var parts = fileName.split(/-/);
      var size = parts[parts.length - 1];
      var iconName = parts.slice(0, parts.length - 1).join('-');

      if(!json[size]) {
        json[size] = {};
      }

      json[size][iconName] = fs.readFileSync(filePath, 'utf-8');
    });

    fs.writeFileSync(process.cwd() + '/svg.js', 'module.exports=' + JSON.stringify(json) + ';');

    buildMetaData.addBuildMetaDataFiles(files);

    if(buildMetaData.writeFile()) {
      gutil.log(gutil.colors.cyan('writing build meta data file: ' + buildMetaData.filePath));
    }
  }

  done();
});