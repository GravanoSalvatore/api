export default defineEventHandler((event) => {
    setResponseHeaders(event, {
      'Access-Control-Allow-Origin': 'https://cryptocurrencybulls.com',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
  });
  