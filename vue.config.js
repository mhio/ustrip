module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.BUILD_ENV === 'pages' ? '/ustrip/' : '/',
}
