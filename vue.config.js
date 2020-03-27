module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'    /*'/new/'*/
    : '/',

    pwa: {
    name: 'My App',
    themeColor: '#6200ea',
    backgroundColor: '#6200ea',
    msTileColor: '#6200ea',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#6200ea',
    start_url: "/profile",
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/registerServiceWorker.js',
      // ...other Workbox options...
    },
    




}
    
}