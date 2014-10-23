var gulpConfig = {
  sourceFiles: {
    sketch: [
      'svg/**/*-slice.svg'
    ],
    svg: [
      'svg/*.svg',
      '!svg/svg-sprite.svg'
    ]
  },
  tasks: {
    sketch: {
      cleanExportPath: 'svg',
      sourceFileName: 'svg-icons'
    }
  }
};

module.exports = gulpConfig;
