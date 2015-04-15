var gulpConfig = {
  webPath: 'web',
  buildPath: 'web/svg',
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
    copyStaticAssets: {
      staticAssetExtensions: ['svg'],
      staticAssetFolders: [
        'svg'
      ]
    },
    sketch: {
      cleanExportPath: 'svg',
      sourceFileName: 'svg-icons'
    }
  }
};

module.exports = gulpConfig;
