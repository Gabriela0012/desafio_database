import * as fs from 'fs'
import __dirname from '../utils.js'

class productContainer{
    constructor(){
        this.path = __dirname+'/files/products.json'
    }

    getAllProducts = async()=>{
        try {
            if(fs.existsSync(this.path)){
                let fileData = await fs.promises.readFile(this.path, 'utf-8')
                let products = JSON.parse(fileData)
                return products
            }else{
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    addProducts = async(product) =>{
        try {
            let products = await this.getAllProducts()
            if(products.length === 0){
                product.id = 1
                products.push(product)
                await fs.promises.writeFile(this.path,JSON.stringify(products, null, '\t'))
                return product.id
            }else{
                product.id =products[products.length-1].id+1
                products.push(product)
                await fs.promises.writeFile(this.path,JSON.stringify(products, null, '\t'))
                return product.id
            }
        } catch (error) {
            console.log(error)
        }
    }

    getById = async(id) =>{
        try {
            let products = await this.getAllProducts()
            let product = null
            for(const item of products){
                if(item.id===id){
                    product =item
                }
            }
            return product
        } catch (error) {
            console.log(error)
        }
    }

    deleteById = async(id)=>{
        try {
            let products = await this.getAllProducts()
            let newproducts = []
            for(const item of products){
                if(item.id===id){
                    continue
                }
                newproducts.push(item)
            }
            await fs.promises.writeFile(this.path,JSON.stringify(newproducts, null, '\t'))
        } catch (error) {
            console.log(error)
        }
    }

    deleteAllProducts = async()=>{
        try {
            await fs.promises.writeFile(this.path,JSON.stringify([], null, '\t'))
        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async(id, newData)=>{
        let productsArray = await this.getAllProducts()
        for(const item of productsArray){
            if(item.id === id){
                item.price = newData
            }
        }
        console.log(`id: ${id}, newData: ${newData}`)
        console.log(productsArray)
        await fs.promises.writeFile(path,JSON.stringify(productsArray, null, '\t'))
    }
}

export default productContainer