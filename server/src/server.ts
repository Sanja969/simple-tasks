import * as http from 'http';

import app from './app';

const PORT = 8000;

const server = http.createServer(app);

server.listen(PORT, ()=> {
  console.log(`Server listening on port ${PORT}`);
});

