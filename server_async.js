const http = require('http');
const url = require('url');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const async = require('async');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (parsedUrl.pathname === '/I/want/title' && req.method === 'GET') {
        const addresses = parsedUrl.query.address;
        
        if (!addresses) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end('<html><body><h1>No addresses provided</h1></body></html>');
            return;
        }

        const addressList = Array.isArray(addresses) ? addresses : [addresses];
        
        async.map(addressList, (address, callback) => {
            const url = address.startsWith('http') ? address : `http://${address}`;
            axios.get(url)
                .then(response => {
                    const dom = new JSDOM(response.data);
                    const title = dom.window.document.querySelector('title').textContent;
                    callback(null, `<li>${address} - "${title}"</li>`);
                })
                .catch(error => {
                    callback(null, `<li>${address} - NO RESPONSE</li>`);
                });
        }, (err, results) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                    <head></head>
                    <body>
                        <h1>Following are the titles of given websites:</h1>
                        <ul>
                            ${results.join('\n')}
                        </ul>
                    </body>
                </html>
            `);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>404 Not Found</h1></body></html>');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
