var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpConfig = require('../config.js');
var globArray = require('glob-array');
var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync(__dirname + '/../lib/jquery.js', 'utf-8');
var buildMetaDataFactory = require('build-meta-data');

gulp.task('svg-sprite', 'Cleans up sketch SVG files, remove un-needed or un-wanted code', function(done) {
  var buildMetaData = buildMetaDataFactory.create(process.cwd() + '/gulp/build-meta-data/svg-sprite.json');
  var files = globArray.sync(gulpConfig.sourceFiles.svg);
  var newFileNames = [];
  var svgSpriteContent = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="display: none;">';

  if(!buildMetaData.hasSameFiles('svg/svg-sprite.svg', files) || buildMetaData.hasChangedFile(files)) {
    files.forEach(function(filePath, key) {
      gutil.log(gutil.colors.cyan('adding ' + filePath + ' to svg sprite'));
      var fileContents = fs.readFileSync(filePath, 'utf-8');

      jsdom.env({
        html: '<html><body>' + fileContents + '</body></html>',
        src: [jquery],
        done: function(err, window) {
          var $ = window.$;

          if($('svg').length > 0) {
            var rootElement = $('svg > defs > g');
            var rootElementId = rootElement.attr('id');
            svgInnerContent = rootElement.removeAttr('id')[0].outerHTML;
            var viewBox = $('svg')[0];

            svgSpriteContent += '<symbol id="' + rootElementId + '" viewBox="' + viewBox._attributes.viewBox._nodeValue + '">' + svgInnerContent + '</symbol>';

            if(key === (files.length - 1)) {
              buildMetaData.addBuildMetaDataFiles(files, process.cwd() + '/svg/svg-sprite.svg', files);

              if(buildMetaData.writeFile()) {
                gutil.log(gutil.colors.cyan('writing build meta data file: ' + buildMetaData.filePath));
              }

              gutil.log(gutil.colors.cyan('processed ' + files.length + ' files'));

              //last file done so build svg sprite
              svgSpriteContent += '</svg>';
              fs.writeFileSync(process.cwd() + '/svg/svg-sprite.svg', svgSpriteContent);
              done();
            }
          }
        }
      });
    });
  } else {
    done();
  }
});