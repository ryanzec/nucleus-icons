var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpConfig = require('../config.js');
var globArray = require('glob-array');
var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync(__dirname + '/../lib/jquery.js', 'utf-8');
var buildMetaDataFactory = require('build-meta-data');
var _ = require('lodash');

gulp.task('sketch', 'Cleans up sketch SVG files, remove un-needed or un-wanted code', function(done) {
  var buildMetaData = buildMetaDataFactory.create(process.cwd() + '/gulp/build-meta-data/sketch.json');
  var files = buildMetaData.getChangedFiles(gulpConfig.sourceFiles.sketch);
  var newFileNames = [];

  if(files.length > 0) {
    files.forEach(function(filePath, key) {
      var fileContents = fs.readFileSync(filePath, 'utf-8');

      gutil.log(gutil.colors.cyan('cleaning Sketch SVG file: ' + filePath));
      fileContents = fileContents
      //remove comments
      .replace(/<\!--.*-->/g, '')
      //remove spaces between tags
      .replace(/>\s*</gm, '><')
      //remove un-needed tags that can't be query in jQuery (Sizzle I don't think can handle an attribute with :)
      .replace(new RegExp('\\s(xmlns|sketch):(xlink|sketch|type)="[a-zA-Z0-9:/.]*', 'gmi'), '');

      jsdom.env({
        html: '<html><body>' + fileContents + '</body></html>',
        src: [jquery/*'http://code.jquery.com/jquery-1.5.min.js'*/],
        done: function(err, window) {
          var $ = window.$;

          if($('svg').length > 0) {
            //remove un-needed attributes, these should be defined by CSS
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[stroke-width]').removeAttr('stroke-width');

            //remove un-needed tags
            $('title').remove();
            $('desc').remove();

            var idsToRemove = [
            ];

            idsToRemove.forEach(function(id) {
              if($('#' + id).length > 0) {
                $('#' + id).removeAttr('id');
              }
            });

            if($('g[id]').length > 0) {
              $('g[id]').each(function() {
                $('svg > g').addClass($(this).attr('id'));
                $(this).removeAttr('id');
              });
            }

            //switch the rest of the ids to classes
            if($('[id]').length > 0) {
              $('[id]').each(function() {
                $(this).addClass($(this).attr('id')).removeAttr('id');
              });
            }

            if($('[id]').length > 0) {
              $('[id]').each(function() {
                $(this).addClass($(this).attr('id')).removeAttr('id');
              });
            }

            //split classes by double dash `--`
            if($('svg [class]').length > 0) {
              $('svg [class]').each(function() {
                $(this).attr('class', $(this).attr('class').replace('--', ' '));
              });
            }

            //common class for svg icons
            $('svg > g').addClass('svg-icon');
            $('svg').removeAttr('height');
            $('svg').removeAttr('width');
            $('svg').attr('style', 'display: none;');

            var classNameMapping = {
              'small-icon': 'small',
              'medium-icon:': 'medium',
              'large-icon': 'large'
            };

            var newFileNameEnding = '';;

            if(Object.keys(classNameMapping).length > 0) {
              _.forEach(classNameMapping, function(nameEnding, className) {
                if(newFileNameEnding === '' && $('svg > g').hasClass(className)) {
                  newFileNameEnding = '-' + nameEnding;
                }
              });
            }

            newFileNameEnding += '.svg';

            var newFileName = filePath.replace('-slice.svg', newFileNameEnding);
            var defId = newFileName.substr(0, newFileName.length - 4);
            defId = defId.split('/');
            defId = defId[defId.length - 1];

            $('svg > g').attr('id', defId);
            $('defs').append($('svg > g').detach());

            //shouldn't need the replace here but the above code to remove the xmlns:xlink attribute leaves it is as an empty value
            fileContents = $('svg')[0].outerHTML;

            fs.writeFileSync(newFileName, fileContents);
            fs.unlink(filePath);
            newFileNames.push(newFileName);

            if(key === (files.length - 1)) {
              buildMetaData.addBuildMetaDataFiles(newFileNames);

              if(buildMetaData.writeFile()) {
                gutil.log(gutil.colors.cyan('writing build meta data file: ' + buildMetaData.filePath));
              }

              gutil.log(gutil.colors.cyan('processed ' + files.length + ' files'));
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