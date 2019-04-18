module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['index.js', 'test/**/*.js'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless_with_flags'],
    customLaunchers: {
      ChromeHeadless_with_flags: {
        base: 'ChromeHeadless',
        flags: [
          '--disable-gpu',
          '--disable-dev-sm-usage',
          '--user-data-dir=/tmp',
          '--enable-precise-memory-info',
          '--js-flags="--expose-gc"'
        ]
      },
      usePolling: true,
      autoWatch: true,
      singleRun: false,
      concurrency: Infinity
    }
  });
}
