import Inventario from '../models/inventario.js'


export const viewInventario = async (req,res)=>{
  try {
   const inventario = await Inventario.find({}).lean()
   res.status(200).render('inventario',{inventario:inventario})
  } 
  catch (e) { console.log(e) }
  
}

export const view = async (req,res)=>{
  try {
    const inventario = await Inventario.find({}).lean()
    res.status(200).render('editInventario',{inventario:inventario})
  }
   catch (e) { console.log(e) }
    
  
  }

  export const create = async (req,res)=>{
    try{
    req.body.url =  Math.floor(Math.random()*10000000000) + ".jpg" 
   
    const inventario = new Inventario(req.body)
      await inventario.save()

    const EDFile = req.files.url

    EDFile.mv(`./public/img/inventario/${inventario.url}`,err => {
      if(err) return res.status(500).send({ message : err })
      return res.status(200).render("nofound",{message:"No se encontró el producto"})
      })
    res.status(200).redirect('/editInventario')
  }catch(e){
    console.log(e)
  }
  
  }

  export const del = async (req,res) =>{
    try {
      const inventariofound = await Inventario.find({_id:req.body._id}).lean()
         if ((Object.entries(inventariofound).length === 0)) {
           return res.status(200).render("nofound",{message:"No se encontró el producto"})
         }
         await Inventario.deleteOne({ _id: req.body._id })
         res.status(200).redirect('/editInventario')
     
   } 
   catch (e) { console.log(e) }  
   
   

  }

  export const update = async (req,res) =>{
    
    let inventario = {}
    if(req.body.nombre)  inventario.nombre = req.body.nombre
    if(req.body.precio) inventario.precio=req.body.precio
    if(req.body.estado) inventario.estado = req.body.estado
    if(req.body.url) inventario.url = req.body.url
    try {
      const inventariofound = await Inventario.find({_id:req.body._id}).lean()
          if ((Object.entries(inventariofound).length === 0)) {
            return res.status(200).render("nofound",{message:"No se encontró el producto"})
          }
      await Inventario.findOneAndUpdate(
        { _id: req.body._id },
        { $set: inventario},
        { new: true }
      )
      if(req.files){
        const EDFile = req.files.imagen
  
      EDFile.mv(`./public/img/inventario/${req.body.url}`,err => {
        if(err) return res.status(500).send({ message : err })
        return res.status(200).render("nofound",{message:"No se encontró el producto"})
        })
      }
      res.status(200).redirect('/editInventario')
      
    } 
    catch (e) { console.log(e) }

   
    
  }