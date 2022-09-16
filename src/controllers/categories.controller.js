import { read,write } from "../utils/model.js"

export const GET =(req,res,next)=>{
    try {
       let categories=read("categories") ;
       let subcategories=read("subcategories");
       let categoryId=req.params.category_id

        categories=categories.filter(categoria=>{
            let byId=categoryId ? categoryId == categoria.category_id : true

            categoria.subcategorie=subcategories.find(subcategorie=>subcategorie.category_id==categoria.category_id)
            delete categoria.subcategorie.category_id

            return byId && categories
       })

       res.send(categories)
    } catch (error) {
        return next(new Error (500,error.message))
    }

}

export const POST=(req,res,next)=>{
    try {
        let categories=read("categories");
        let {category_name}=req.body;

        let newCategory={
            category_id:categories.length ? categories.at(-1)?.category_id +1:1,
            category_name,
        }

        categories.push(newCategory)
        write("categories",categories)

        res.status(201).json({
            status:201,
            message:"new category created",
            data:newCategory
        })


    } catch (error) {
        return next(error.message)
    }

}

export const DELETE=(req,res,next)=>{
    try {
        let categories=read("categories");

        let newIndex = categories.findIndex(categoria=>categoria.category_id == req.params.category_id)

        if(newIndex == -1){
            return next(new Error(404,"category not found"))
        }

        let deletePost=categories.splice(newIndex,1)

        write("categories",categories)

        res.status(202).json({
            status:204,
            message:"category deleted",
            data:deletePost
        })

    } catch (error) {
        return next(error.message)
    }
}

export const PUT=(req,res,next)=>{
    try {
        let categories=read("categories");

        let categoria = categories.find(categoria=>categoria.category_id == req.params.category_id)

        if(!categoria){
            return next(new Error (404,"categoria not found"))
        }

        
        categoria.category_name=req.body.category_name || categoria.category_name
        
        write("categories",categories)

        res.status(202).json({
            status:202,
            message:"category name update",
            data:categoria
        })

    } catch (error) {
        return next(error.message)
    }

}