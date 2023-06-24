const mysql = require('mysql')
require('dotenv').config();

const getConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const createTables = () => {
    const createCosmeticsTable = `CREATE TABLE IF NOT EXISTS cosmetics (
        id INT PRIMARY KEY AUTO_INCREMENT, 
        name VARCHAR(255) NOT NULL, 
        type VARCHAR(255) NOT NULL
    )`;

    getConnection.query(createCosmeticsTable, (err) => {
        if (err) {
            throw err;
        }

        console.log('Cosmetics table created or already existed!');
    })

    addPetCosmetic("Frog");
}

const addPetCosmetic = (name) => {
    const insertPetQuery = 'INSERT INTO cosmetics (name, type) VALUES (?, ?)';
    const values = [name, "pet"]; // Modify the scale value as needed

    getConnection.query(insertPetQuery, values, (err, result) => {
        if (err) {
            throw err;
        }

        console.log('Pet added successfully:', result);
    });
};

module.exports = {
    getConnection,
    createTables,
    addPetCosmetic
};