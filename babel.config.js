//remove console code part 1 starts
const removeConsolePlugin = []
if(process.env.NODE_ENV === 'production') {
  removeConsolePlugin.push("transform-remove-console")
}
//remove console code part 1 ends

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  
//remove console code part 2 starts
  plugins: removeConsolePlugin
//remove console code part 2 ends

}
