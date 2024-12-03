const readline = require('readline');

const https = require('node:https');
const fs = require('node:fs');

const options = {
    key: fs.readFileSync('./optionsForServer/private-key.pem'),
    cert: fs.readFileSync('./optionsForServer/certificate.pem'),
};

// openssl req -nodes -new -x509 -keyout private-key.pem -out certificate.pem -days 365

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Welcome to live server!\n');
}).listen(2000, () => {
    console.log('Server is running at https://localhost:2000');
});

const readlineHandler = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('What is your name? \n', (name) => {
        console.log(`Hi, ${name}!`);
        rl.close();
    });
};

readlineHandler();