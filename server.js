const express = require("express");
const bcrypt = require('bcrypt');
const cors = require("cors");
const knex = require('knex');

const register =require('./controllers/register');
const signin = require("./controllers/signin");
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//define db from knex
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '123456',
      database : 'smart-brain'
    }
});

//express
const app = express();
app.use(express.json());
app.use(cors())


//index
app.get('/',(req,res)=>{res.send('it is working')})

//logar
app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

//registro-adicionar na db
app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)})

// requisitar perfil id pra açoes futuras
app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)})

//quando enviar imagem aumentar a contagem
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000,()=>{
console.log(`app is running on port ${process.send.PORT}`)
})