const db = require('../db/queries.js');

async function getProducts(req, res) {
    try {
        const { sort, category, search } = req.query;
        console.log("Search: ", search);
        const categories = await db.getAllCategories();
        
        const products = await db.getProducts({
            sort,
            category,
            search
        });

        res.render('products', { 
            products, 
            categories,
            selectedCategory: category,  // For keeping the selected category in the form
            selectedSort: sort          // For keeping the selected sort option
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error loading products');
    }
}


module.exports = {
    getProducts
};