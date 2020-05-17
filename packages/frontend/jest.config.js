const { name } = require('./package.json')

module.exports = {
  displayName: name,
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['<rootDir>/tests/unit/index.js'],
}
