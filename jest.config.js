// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsconfig = require('./tsconfig.json');
const paths = tsconfig.compilerOptions.paths;

const moduleNameMapper = Object.keys(paths).reduce((acc, curr) => {
  const key = curr.replace('*', '(.*)');
  const path = paths[curr][0].replace('*', '$1').replace('.', '');
  return {
    ...acc,
    [key]: `<rootDir>${path}`
  };
}, {});

module.exports = {
  moduleNameMapper,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node'
};
