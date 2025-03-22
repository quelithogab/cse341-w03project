const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Accounts Api',
    description: 'Accounts Api',
  },
  host: 'localhost:3002',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);


