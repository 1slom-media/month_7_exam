import express from 'express';
import adminRouter from './routers/admin.routers.js';
import productsRouter from './routers/products.routers.js';
import categoriesRouter from './routers/categories.routers.js';
import subcategoriesRouter from './routers/subcategories.routers.js';
import cors from 'cors';

const PORT=process.env.PORT || 5000

const app=express();
app.use(express.json());
app.use(cors())

app.use(adminRouter);
app.use(productsRouter);
app.use(categoriesRouter);
app.use(subcategoriesRouter);


app.listen(PORT,()=>console.log(PORT))
