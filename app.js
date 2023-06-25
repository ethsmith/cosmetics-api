const express = require('express');

const dbController = require('./db')

const cosmeticRouter = require('./cosmetic.controller')

require('dotenv').config();

const app = express();

// Middleware to allow only specified IP addresses
const allowOnlyIPs = (req, res, next) => {
    const allowedIPs = process.env.ALLOWED_IPS.split(',');

    let clientIP = req.headers['x-forwarded-for'] || req.ip;
    if (clientIP.startsWith('::ffff:')) {
        clientIP = clientIP.slice(7); // Remove the '::ffff:' prefix
    }

    if (allowedIPs.includes(clientIP)) {
        // IP is allowed, proceed to the next middleware or route handler
        next();
    } else {
        // IP is not allowed, send forbidden response
        res.status(403).send('Forbidden');
    }
};

app.use(allowOnlyIPs);
app.use('/api/cosmetics', cosmeticRouter.router);

// Connect to MySQL
dbController.getConnection.connect((err) => {
    if (err) {
        throw err;
    }

    console.log('Connected to MySQL database');

    dbController.createTables();
});

// Define a route to fetch data from MySQL
// app.get('/cosmetics', (req, res) => {
//     const query = 'SELECT * FROM cosmetics';
//     dbController.getConnection.query(query, (err, results) => {
//         if (err) {
//             throw err;
//         }
//         res.json(results);
//     });
// });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});