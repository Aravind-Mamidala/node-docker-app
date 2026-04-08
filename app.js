const http = require('http');

const PORT = 5000;

const server = http.createServer((req, res) => {
    res.write("Hello Bunny 🐰 Docker Working Perfect!");
    res.end();
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
