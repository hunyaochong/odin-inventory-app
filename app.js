if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const express = require('express');
const app = express();
const ejs = require('ejs');
const db = require('./db/queries');
const productController = require('./controllers/productController');
const categoryController = require('./controllers/categoryController');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{res.render('index')});
app.get('/products', productController.getProducts);
app.get('/categories', categoryController.getCategories);
app.delete('/categories/:id', categoryController.deleteCategory);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`)});