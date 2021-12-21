import mongoose from 'mongoose'

const inventarioCollection = 'inventario'

const inventarioSchema = new mongoose.Schema({
    
    nombre: { type: String, require: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    type: {type:String, require:true}

})

export default mongoose.model(inventarioCollection, inventarioSchema)