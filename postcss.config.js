module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 367, //视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667, //视窗的高度，对应的是我们设计的高度（也可以不配置）
      unitPrecision: 5, //指定'px'转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', //执行需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类，如果不想要做转换，只需要添加一个类名'ignore'就可以了
      minPixelValue: 1, //小于或等于'1px'不转换为视窗单位
      mediaQuery: false, //允许在媒体查询中转换'px'
    }
  }
}
