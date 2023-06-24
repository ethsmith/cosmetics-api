const db = require('./db')

async function getAllCosmetics() {
    const query = 'SELECT * FROM cosmetics';
    await db.getConnection.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        return results.json;
    });
}