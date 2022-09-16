import { read,write } from "../utils/model.js";

export const GET =(req,res,next)=>{
    try {
       let subcategories=read("subcategories");
       let products=read("products");
       let categoryId=req.params.sub_category_id

        subcategories=subcategories.filter(subcategoria=>{
            let byId=categoryId ? categoryId == subcategoria.sub_category_id : true

            subcategoria.product=products.find(product=>product.sub_category_id==subcategoria.sub_category_id)
            delete subcategoria.product.sub_category_id

            return byId && subcategories
       })

       res.send(subcategories)
    } catch (error) {
        return next(new Error (500,error.message))
    }

}

export const POST=(req,res,next)=>{
    try {
        let subcategories=read("subcategories");
        let {sub_category_name,category_id}=req.body;

        let newCategory={
            sub_category_id:subcategories.length ? subcategories.at(-1)?.sub_category_id +1:1,
            sub_category_name,category_id,
        }

        subcategories.push(newCategory)
        write("subcategories",subcategories)

        res.status(201).json({
            status:201,
            message:"new subcategory created",
            data:newCategory
        })


    } catch (error) {
        return next(error.message)
    }

}

export const DELETE=(req,res,next)=>{
    try {
        let subcategories=read("subcategories");

        let newIndex = subcategories.findIndex(categoria=>categoria.sub_category_id == req.params.sub_category_id)

        if(newIndex == -1){
            return next(new Error(404,"subcategory not found"))
        }

        let deletePost=subcategories.splice(newIndex,1)

        write("subcategories",subcategories)

        res.status(202).json({
            status:204,
            message:"subcategory deleted",
            data:deletePost
        })

    } catch (error) {
        return next(error.message)
    }
}

export const PUT=(req,res,next)=>{
    try {
        let subcategories=read("subcategories");

        let categoria = subcategories.find(categoria=>categoria.sub_category_id == req.params.sub_category_id)

        if(!categoria){
            return next(new Error (404,"subcategoria not found"))
        }

        
        categoria.sub_category_name=req.body.sub_category_name || categoria.sub_category_name
        categoria.category_id=req.body.category_id || categoria.category_id
        
        write("subcategories",subcategories)

        res.status(202).json({
            status:202,
            message:"subcategoryupdate",
            data:categoria
        })

    } catch (error) {
        return next(error.message)
    }

}