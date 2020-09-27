import path from 'path'

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src')
  },
  defineConstants: {
  },
  mini: {},
  h5: {}
}
