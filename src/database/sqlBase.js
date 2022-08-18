import knex from 'knex';
import initialProducts from '../files/InitialProducts.js'




class sqliteBase{
  constructor(config, items) {
    this.knex = knex(config)
    this.items = items
  }
  createTable = async() => {
    try {
      let message;
      this.knex.schema.hasTable(this.items)
      .then( async(exists) => {
        if (!exists) {
          if (this.items === 'products') {
            message = `Tabla de productos creada exitosamente`;
            console.log({Method:'createTable()',Description:message})
            await this.knex.schema.createTable(this.items, (table) => {
              table.increments('id').primary()
              table.string('name', 200).notNullable()
              table.float('price').notNullable()
              table.string('thumbnail', 4000)
            })
            
          } 
          else {
            message = `Tabla de Mensajes creada exitosamente`;
            console.log({Method:'createTable()',Description:message})
            await this.knex.schema.createTable(this.items, (table) => {
              table.increments('id').primary()
              table.string('userName', 100).notNullable()
              table.string('date', 50).notNullable()
              table.string('message', 4000).notNullable()
            })
          }
        }
      })
      .then(()=> console.log({Method:'createTable()',Description:message}))
      .catch(error => console.log({Method:'createTable()',Server: error}))
      .finally(()=> this.knex.destroy());


    } catch (error) {
      console.log({Method:'createTable()',Server: error})
    }
  }

  createInitialProducts = async() => {
    try {
      this.knex.insert(initialProducts).into('products')
        .then(()=> console.log({Method:'createInitialProducts()',Description:`Tabla '${this.items}' insertada exitosamente`}))
        .catch(error => console.log({Method:'createInitialProducts()',Server: error}))
        .finally(()=> this.knex.destroy());
    } catch (error) {
      console.log({Method:'createInitialProducts()',Server: error})
    }
  }

  save= async(object) =>{
    try {
      return this.knex(this.items).insert(object)
              .then(()=> console.log({Method:'save= async(object) ',Description:`Tabla '${this.items}' insertada exitosamente`}))
              .catch(error => console.log({Method:'save= async(object) ',Server: error}))
              .finally(()=> this.knex.destroy());        
    } catch (error) {
      console.log({Method:'save= async(object) ',Server: error})
    }
  }

  getAll= async()=> {
    try {
      return this.knex(this.items).select('*')
              .then((result)=> {
                  console.log({Method:'getAll()',Description:`Tabla '${this.items}' seleccionada exitosamente`})
                  return result
              })
              .catch(error => {
                console.log({Method:'getAll()',Server: error})
                return []
              })
              .finally(()=> this.knex.destroy());
    } catch (error) {
      console.log({Method:'getAll()',Server: error})
    }
  } 

  close() {
    this.knex.destroy()
      .then(()=> console.log({Method:'close()',Description:`destroy() desconexion de la Tabla '${this.items}' exitosamente`}))
  }

  
}

export default sqliteBase

