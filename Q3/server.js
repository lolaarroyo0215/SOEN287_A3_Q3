const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const path = require('path');
const { phoneChecker } = require('./phoneChecker.js');

const PORT = process.env.PORT || 8000;

const server = http.createServer(async (req, res) => {
    try {
        console.log(`Received request: ${req.method} ${req.url}`);
        // Check if GET request
        if (req.method === 'GET') {

            const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
            console.log(`Request URL: ${req.url}`);

            if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/index-phone.html') {
                const filePath = path.join(__dirname, 'public3', 'index-phone.html');
                console.log(`Serving file: ${filePath}`);
                const data = await fs.readFile(filePath);
                res.setHeader('Content-Type', 'text/html');
                res.write(data);
                res.end();
            } else if (parsedUrl.pathname === '/index-phone' && parsedUrl.searchParams.has('number')) {
                const phoneNumber = parsedUrl.searchParams.get('number');
                console.log(`Phone number received: ${phoneNumber}`);
                const phoneMessage = phoneChecker(phoneNumber);
                res.setHeader('Content-Type', 'text/plain');
                res.write(phoneMessage);
                res.end();
            } else if (parsedUrl.pathname === '/index-phone') {
                // Redirect to the form without query parameters
                console.log('Redirecting to /index-phone.html');
                res.writeHead(302, { Location: '/index-phone.html' });
                res.end();
            } else {
                throw new Error('Not Found');
            }
        } else {
            throw new Error('Method not allowed');
        }

    } catch (error) {
        console.error('Server error: ', error.message);
        if (!res.headersSent) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
        }
        res.end(`Server error: ${error.message}`);
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
