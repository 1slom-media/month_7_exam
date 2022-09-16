import { LoginSchema} from "../utils/validation.js";

export default (req,res,next)=>{
    try {
        if(req.url=="/login"){
            let{error}=LoginSchema.validate(req.body)
            if(error) throw error
        }
        return next();
    } catch (error) {
        return next(new Error (401,error.message))
    }
}