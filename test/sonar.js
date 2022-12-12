const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
  serverUrl: 'http://localhost:9000',
  options: {
    'sonar.sources': '.',
    'sonar.tests': 'test',
    'sonar.inclusions': 'src/**',
    'sonar.coverage.exclusions': 'src/**/index.js',
    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    'sonar.login': 'admin',
    'sonar.password': 'adminadmin',
  },
}, () => { });
