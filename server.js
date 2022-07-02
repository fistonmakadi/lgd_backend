var cors = require('cors')
var express = require('express')
var bodyParser = require('body-parser')

//Utilisation de variable d'environnement dans notre projet
require('dotenv').config()

var app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false,limit: '50mb'}))
app.use('/public', express.static('public'))
app.use(cors())


app.use((req, res, next)=> {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With ,Content-Type, Accept");
    next();
  
    app.options("*",(req,res)=>{
      res.header("Access-Control-Allow-Methods", "PUT, GET,POST");
      res.send();
    });
    
   });

   //Immportation de nos fichiers routes
   const adherent = require("./root/adherentRoot");
   const membre = require("./root/membreRoot");
  

   app.use('/adherent',  adherent)
   app.use('/membre',  membre)


app.listen(process.env.APP_PORT, ()=>{
    console.log("Serveur ecoute...")
})

