// module.exports = {
//   configureWebpack: {
//     resolve: {
//       alias: {
//         'assets': resolve('@/assets'),
//         'common': resolve('@/common'),
//         'components': resolve('@/components'),
//         'network': resolve('@/network'),
//         'views': resolve('@/views'),
//       }
//     }
//   }
// }


module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
