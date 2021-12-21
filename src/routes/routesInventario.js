import * as controllerInventario from '../controllers/controllerInventario.js'
import * as middlewareUsers from '../middlewares/middlewaresUsers.js'

const routesInventario = (app) => {
    app.get('/inventario',controllerInventario.viewInventario)
    app.get('/editinventario',controllerInventario.view)
    app.post('/editinventario',controllerInventario.create)
    app.delete('/editinventario',controllerInventario.del)
    app.put('/editinventario',controllerInventario.update)
}
export default routesInventario