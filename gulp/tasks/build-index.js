var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var globArray = require('glob-array');

gulp.task('build-index', 'Build index file', function(done) {
  var htmlTemplate = fs.readFileSync(process.cwd() + '/web/index-template.html', 'utf-8');

  var svgFiles = globArray.sync([process.cwd() + '/web/svg/*.svg']);
  var allSvgString = '';
  var regex;

  svgFiles.forEach(function(filePath) {
    var baseFileName = path.basename(filePath);
    regex = new RegExp('<!-- SVG-REPLACE:/svg/' + baseFileName + ' -->', 'g');
    htmlTemplate = htmlTemplate.replace(regex, '<div class="svg-icon">' + fs.readFileSync(filePath, 'utf-8') + '</div>');
    allSvgString += '<div class="svg-icon">' + fs.readFileSync(filePath, 'utf-8') + '</div>';
  });

  regex = new RegExp('<!-- SVG-REPLACE -->', 'g');
  htmlTemplate = htmlTemplate.replace(regex, allSvgString);

  fs.writeFileSync(process.cwd() + '/web/index.html', htmlTemplate);
});