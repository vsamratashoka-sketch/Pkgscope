import express from 'express'
import { resolver } from './lib/resolver.js'

const app = express()


//middleware
app.use(express.json())
const port  = process.env.PORT || 4050

app.post('/', async(req, res) => {
    const { dependencies } = req.body
   if(!dependencies){
    return res.status(400).send('Add the dependencies');
   };
    try {
        const response = await resolver(dependencies);

        res.status(201).json(response)
    } catch (error) {
        res.status(500).send("Server-side error")
    }

})

app.listen(port, () => {
    console.log('PORT is at port', port)
})

