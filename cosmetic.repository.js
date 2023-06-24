const db = require('./db')

async function getAllCosmetics() {
    const query = 'SELECT * FROM cosmetics';
    const result = await db.getConnection.query(query);
    return result.rows;
}

async function getCosmeticById(id) {
    const query = `SELECT * FROM employees WHERE id = ${id} LIMIT 1`;
    const result = await db.getConnection.query(query);
    return result.rows;
}

async function createCosmetic(cosmetic) {
    const query = `INSERT INTO cosmetics (name, type) VALUES (?, ?) RETURNING *`;
    const values = [cosmetic.name, cosmetic.type];
    const result = await db.getConnection.query(query, values);
    return result.rows[0];
}

