const router = require('express').Router()

const Person = require ('../models/Person')

// CREATE
router.post('/', async (req, res) => {

    // req.body
    const{name, salary, approved} = req.body

    if (!name) {
        res.status(422).json({error : 'O nome é Obrigatório!'})
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    // create
    try{
        // criando dados
        await Person.create(person)
        res.status(201).json({msg: 'Pessoa inserida no sistema com sucesso!'})
    }catch (error) {
        res.status(500).json({error: error})
    }

})

// READ
router.get('/', async (req,res) => {
     

    try{
        // Deu bom
        const people = await Person.find()

        res.status(200).json(people)
        
    }catch (error) { // Deu ruim
        res.status(500).json({error: error})
    }
})
// rotas dinâmicas
router.get('/:id', async (req,res) => {

    //extraindo dado da requisição
    const id = req.params.id

    try{
        // Deu bom
        const person = await Person.findOne({_id: id})

        //Se a pessoa não for encontrada
        if (!person) {
            res.status(422).json({msg:'O usuário não foi encontrado!'})
            return  
        }

        res.status(200).json(person)
    }catch (error) { // Deu ruim
        res.status(500).json({error: error})
    }

})

//UPDATE (PUT, PATCH)
router.patch('/:id', async (req,res) => {
    
    const id = req.params.id

    const{name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try{
        // Deu bom
        const updatedPerson = await Person.updateOne({_id: id} , person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({msg: 'O usuário não foi encontrado'})
        }

        res.status(200).json(person)
    }catch (error) { // Deu ruim
        res.status(500).json({error: error})
    }


})


//DELETE
router.delete('/:id', async (req,res) => {

    const id = req.params.id

    const person = await Person.findOne({_id: id})

     //Se a pessoa não for encontrada
    if (!person) {
        res.status(422).json({msg:'O usuário não foi encontrado!'})
        return  
    }

    try{
        // Deu bom
        await Person.deleteOne({_id: id})
        res.status(200).json({msg: "Usuário Removido com sucesso"})

        }catch (error) { // Deu ruim
            res.status(500).json({error: error})
        }   

    
})

module.exports = router