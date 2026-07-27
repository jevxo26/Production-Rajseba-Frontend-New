const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/bookings',
  method: 'GET'
};

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log(JSON.stringify(parsed.data[0], null, 2).slice(0, 2000));
    } catch(e) {
      console.log("Parse error or not JSON", data.slice(0, 500));
    }
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
