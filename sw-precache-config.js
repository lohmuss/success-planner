module.exports = {
  staticFileGlobs: [
    'dist/**.html',
    'dist/**.js',
    'dist/**.css',
    'dist/assets/**.css',
    'dist/assets/icons/*',
    'dist/assets/fonts/MaterialIcons-Regular.tff',
    'dist/assets/fonts/MaterialIcons-Regular.woff',
    'dist/assets/fonts/MaterialIcons-Regular.woff2'
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  navigateFallback: '/index.html'
};