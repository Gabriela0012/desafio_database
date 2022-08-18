import { Router } from "express"
import productContainer from '../container/productContainer.js'



const router = Router()
const productService = new productContainer()

router.post('/newProduct', async(req,res)=>{
    console.log('entran al api')
    console.log(req.body)
    res.send({status:'success', message:'Product added'})
})

export default router