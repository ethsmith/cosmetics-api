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

async function updateCosmetic(cosmetic) {
    const query = 'UPDATE cosmetics SET name = $1, type = $2 WHERE id = $3 RETURNING *';
    const values = [cosmetic.name, cosmetic.type, cosmetic.id];
    const result = await db.getConnection.query(query, values);
    return result.rows[0];
}

async function deleteCosmetic(id) {
    const query = `DELETE FROM cosmetics WHERE id = ${id}`;
    await db.getConnection.query(query);
}

module.exports = {
    getAllCosmetics,
    getCosmeticById,
    createCosmetic,
    updateCosmetic,
    deleteCosmetic
}
