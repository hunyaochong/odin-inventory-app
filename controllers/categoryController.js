const db = require('../db/queries.js');

async function getCategories(req, res) {
    const categories = await db.getAllCategories();
    res.render('categories', { categories } );
};

async function deleteCategory(req, res) {
    
    console.log("request body: ", req.params.id);
    const categoryId = req.params.id;
    await db.deleteCategory(categoryId);
    
    res.json({redirect: '/categories'});
}

module.exports = {
    getCategories,
    deleteCategory
};