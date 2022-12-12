const jsYaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

function parseYamlFolder(folder) {
  const jsonFlat = fs.readdirSync(path.join(__dirname, folder)).reduce((acc, file) => {
    const json = jsYaml.safeLoad(fs.readFileSync(path.resolve(__dirname, folder, file), 'utf8'));
    return {
      ...acc,
      ...json,
    };
  }, {});
  return jsonFlat;
}

module.exports = {
  apiDoc: {
    openapi: '3.0.3',

    info: {
      title: 'Saints resources',
      version: '0.0.1',
    },

    components: {
      schemas: parseYamlFolder('./schemas'),
      responses: parseYamlFolder('./responses'),
      securitySchemes: parseYamlFolder('./security'),
      examples: parseYamlFolder('./examples'),
    },

    paths: {},
    security: [
      {
        ipAuth: [],
      },
    ],
  },
  getDoc: (filename) => jsYaml.safeLoad(fs.readFileSync(path.resolve(path.dirname(filename), `${path.basename(filename, '.js')}.yml`), 'utf8')),
};
