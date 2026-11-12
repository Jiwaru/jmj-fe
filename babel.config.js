module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    '@babel/plugin-transform-runtime',
  ],
};
