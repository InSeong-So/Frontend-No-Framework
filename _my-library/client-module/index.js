import HTTPClient from './src/app.js';

const http = new HTTPClient(
  {
    baseURL: 'http://localhost:3000',
  },
  {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
);

const getMenu = () => http.get('/api/category/espresso/menu');

const printResult = async () => {
  const result = await getMenu();
  console.log(result);
};

printResult();
