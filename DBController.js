const mysql = require('mysql')
require('dotenv').config();

const getDb = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const createTables = () => {
    const createPetsTable = `CREATE TABLE IF NOT EXISTS pets (
        id INT PRIMARY KEY AUTO_INCREMENT, 
        name VARCHAR(255) NOT NULL, 
        identifier VARCHAR(255) NOT NULL,
        scale DECIMAL(4, 2) NOT NULL
    )`;

    getDb.query(createPetsTable, (err) => {
        if (err) {
            throw err;
        }

        console.log('Pets table created or already existed!');
    })
}

const addPet = (name) => {
    const identifier = `pets:${name}`;

    const insertPetQuery = 'INSERT INTO pets (name, identifier, scale) VALUES (?, ?, ?)';
    const values = [name, identifier, 1.0]; // Modify the scale value as needed

    getDb.query(insertPetQuery, values, (err, result) => {
        if (err) {
            throw err;
        }

        console.log('Pet added successfully:', result);
    });
};

module.exports = {
    getDb,
    createTables,
    addPet
};