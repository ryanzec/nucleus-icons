var gulpConfig = {
  sourceFiles: {
    sketch: [
      'svg/*-slice.svg'
    ],
    svg: [
      'svg/*.svg',
      '!svg/svg-sprite.svg'
    ]
  }
};

module.exports = gulpConfig;
