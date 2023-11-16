// config inicial
const express = require('express')
const app = express()
const mongoose = require('mongoose')

//swagger docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
const DB_USER = ""
const DB_PASSWORD = ""

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mg7w6fa.mongodb.net/?retryWrites=true&w=majority`)
.then( () => { //quando da certo
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
}) 
.catch((err) => {console.log(err)}) //quando der errado

