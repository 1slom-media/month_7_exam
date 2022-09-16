import { read,write } from "../utils/model.js";

export const GET =(req,res,next)=>{
    try {
       let products=read("products") ;
       let {category_id,model,sub_category_id}=req.query;
       let params=req.params.product_id
       if(req.url=='/products'){
        res.send([])
       }else{
           let data=products=products.filter(product=>{
           let byParamsId=params ? params==product.product_id :true
           let byModel=model ? product.model.toLowerCase().includes(model.toLowerCase()): true 
           let byuserCategoryId=category_id ? product.category_id==category_id : true
           let byuserSubCategoryId=sub_category_id ? product.sub_category_id==sub_category_id : true
    
           return byModel && byuserCategoryId && byuserSubCategoryId && byParamsId
          })
          res.send(data)
       }


    } catch (error) {
        return next(new Error (500,error.message))
    }

}

export const POST=(req,res,next)=>{
    try {
        let products=read("products");
        let {sub_category_id,model,product_name,color,price}=req.body;

        let newproduct={
            product_id:products.length ? products.at(-1)?.product_id +1:1,
            sub_category_id,model,product_name,color,price
        }

        products.push(newproduct)
        write("products",products)

        res.status(201).json({
            status:201,
            message:"product created",
            data:newproduct
        })


    } catch (error) {
        return next(error.message)
    }

}

export const PUT=(req,res,next)=>{
    try {
        let products=read("products");

        let product = products.find(product=>product.product_id == req.params.product_id)

        if(!product){
            return next(new Error (404,"subcategoria not found"))
        }

        
        product.sub_category_id=req.body.sub_category_id || product.sub_category_id
        product.product_name=req.body.product_name || product.product_name
        product.model=req.body.model || product.model
        product.color=req.body.color || product.color
        product.price=req.body.price || product.price
        
        write("products",products)

        res.status(202).json({
            status:202,
            message:"product update",
            data:product
        })

    } catch (error) {
        return next(error.message)
    }

}

export const DELETE=(req,res,next)=>{
    try {
        let products=read("products");

        let newIndex = products.findIndex(product=>product.product_id == req.params.product_id)

        if(newIndex == -1){
            return next(new Error(404,"product not found"))
        }

        let deleteProduct=products.splice(newIndex,1)

        write("products",products)

        res.status(202).json({
            status:204,
            message:"product deleted",
            data:deleteProduct
        })

    } catch (error) {
        return next(error.message)
    }
}