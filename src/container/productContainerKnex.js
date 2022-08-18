import config from '../setting/mysqlite3.js'
import sqliteBase from '../database/sqlBase.js'


let database = new sqliteBase(config, 'products')
const imgNOFound = 'https://cdn4.iconfinder.com/data/icons/basic-ui-element-flat-style/512/Basic_UI_Elements_-_2.3_-_Flat_Style_-_36-02-64.png'

class productContainerKnex{
  createProductsTable = async() => {
    try {
        database = new sqliteBase(config, 'products')
        await database.createTable()
    } catch (error) {
      console.log({Server: error})
    }
  } 
  createInitialProducts = async() => {
    try {
        database = new sqliteBase(config, 'products')
        await database.createInitialProducts()     
    } catch (error) {
      console.log({Server: error})
    }
  }


  getAllProduct = async () => {
    try {
      database = new sqliteBase(config, 'products')      
      const allProducts = await database.getAll()
      if(typeof allProducts !== 'undefined')
        return allProducts.sort((a, b) => (a.id > b.id ? -1 : 1)) 
      else 
        return []
    } catch (error) {
      console.log({Server: error})
    }
  }

  addNewProduct = async (product) => {
    try {
      database = new sqliteBase(config, 'products')            
      const prevProducts = await database.getAll()
      const noImage = imgNOFound
        

      const isValidURL = (imageURL) => {
        let url
        try {
          url = new URL(imageURL)
        } catch (_) {
          return false
        }
        return url.protocol === 'http:' || url.protocol === 'https:'
      }

      const newProduct = {
 
        name: product.name ? product.name : 'No Title',
        price: product.price ? product.price : 0,
        thumbnail: isValidURL(product.thumbnail) ? product.thumbnail : noImage,
      }
      database = new sqliteBase(config, 'products')         
      await database.save(newProduct)
    } catch (error) {
      console.log({Server: error})
    }
  }
  
    

}

export default productContainerKnex
