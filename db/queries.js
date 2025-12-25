const pool = require("./pool");

async function getProducts({ sort, category, search } = {}) {
    let query = 'SELECT p.* FROM products p';
    const queryParams = [];
    const whereClauses = [];
    
    // Handle search filter
    if (search) {
        whereClauses.push(`LOWER(p.name) LIKE $${whereClauses.length + 1}`);
        queryParams.push(`%${search.toLowerCase()}%`);
    }

    // Handle category filter
    if (category) {
        whereClauses.push(`p.category_id = $${whereClauses.length + 1}`);
        queryParams.push(category);
    }
    
    // Build WHERE clause if we have any conditions
    if (whereClauses.length > 0) {
        query += ' WHERE ' + whereClauses.join(' AND ');
    }
    
    // Handle sorting
    if (sort) {
        query += ` ORDER BY p.price ${sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'}`;
    }
    
    const { rows } = await pool.query(query, queryParams);
    return rows;
}

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}

async function deleteCategory(id) {
    const query = 'DELETE FROM categories WHERE id = $1 RETURNING *';
    await pool.query(query, [id]);
    return;
}

module.exports = {
    getProducts,
    getAllCategories,
    deleteCategory
};