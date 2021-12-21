import express from 'express'
import morgan from 'morgan'
import handlebars  from "express-handlebars"
import path from 'path'
import methodOverride from 'method-override'
import fileUpload from 'express-fileupload'
import { conectarDB } from './config/db.js'
import { ConnectPassport } from './config/connectPassport.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import routesInventario from './src/routes/routesInventario.js'
const app = express()

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/public')));

app.use(methodOverride('_method'))

app.use(morgan('dev'))

app.use(express.urlencoded({ extended: true })) 

app.use(express.json()) 

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
   // dir for windows PC
    tempFileDir: path.join(__dirname, './tmp'),
  }),
);


// -------------- Configuracion Handlebars ----------------------------------
app.engine("hbs", handlebars({
  extname: "hbs",
  defaultLayout: "index",
  layoutsDir: path.join(__dirname, "/src/views/layouts"),
  partialsDir: path.join(__dirname, "/src/views/partials"),
}));
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'hbs');

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,

  store: MongoStore.create({
    mongoUrl:"mongodb://localhost:27017/comercio",
    mongoOptions: advancedOptions,
    collectionName: 'sessions',
    ttl: 10 * 60
  })
}))
conectarDB()
ConnectPassport()
app.use(passport.initialize())
app.use(passport.session())
routesInventario(app)


app.listen(8000, () => {
    console.log(`el servidor esta corriendo en : http://localhost:${8000}`)
  })