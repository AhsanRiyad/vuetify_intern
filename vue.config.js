module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'    /*'/new/'*/
    : '/',

    pwa: {
    name: 'NDC92',
    start_url: './profile',
    themeColor: '#6200ea',
    backgroundColor: '#6200ea',
    msTileColor: '#6200ea',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#6200ea',
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/registerServiceWorker.js',
      // ...other Workbox options...


    },
    




}
    
}