/*  development database  */
const database = [
  {
    id: 1,
    origin: 'http://localhost:8080',
    apiKey: process.env.VAINU_AUTH,
  },
  {
    id: 2,
    origin: 'http://localhost:5000',
    apiKey: process.env.VAINU_AUTH,
  },
  {
    id: 3,
    origin: 'http://localhost:5500',
    apiKey: process.env.VAINU_AUTH,
  },
];

module.exports = {
  database,
};
