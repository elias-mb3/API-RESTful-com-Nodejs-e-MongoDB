// config inicial
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()


// forma de ler JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// rotas da api
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

// rota inicial / endpoint
app.get('/', (req, res) => {

    //mostrar req

    res.json({msg: "Oi Express!"})
})



//entregar uma porta

//PELAMORDEDEUSNÃOESQUECE DE TIRAR ISSO DO REPOSITORIO
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xuvrsom.mongodb.net/?retryWrites=true&w=majority`)
.then( () => { //quando da certo
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
}) 
.catch((err) => {console.log(err)}) //quando der errado
