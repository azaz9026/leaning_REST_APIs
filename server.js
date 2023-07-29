const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Product = require('./models/producModels');


app.use(express.json());
app.use(express.urlencoded({extended : false}));

    const PORT = 3000;


    app.get( '/' , (req , res) =>{
        res.send('Hello Node APIs')
    })

    app.get( '/blog' , (req , res) =>{
        res.send('Hello Node Blog')
    })



// to get all data to database==================================================================================

    app.get('/products' , async(req , res) => {
        try{
            const products = await Product.find({})
            res.status(200).json(products)
        }catch(error){
            res.status(500).json({message : error.message })
        }
    })


// to get data by the ID  it given only one data ==================================================================================

    app.get('/products/:id' , async(req , res) => {
        try{
            const {id} = req.params;
            const product = await Product.findById(id)
            res.status(200).json(product)
        }catch(error){
            res.status(500).json({message : error.message })
        }
    })





// post the data in database with the mongodb===============================================================

    app.post('/product' , async (req , res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
    })



// put to update a products======================================================================================

    app.put('/products/:id' , async(req , res) => {
        try{
            const {id} = req.params;
            const product = await Product.findByIdAndUpdate( id , req.body );
                    if(!product){
                        return res.status(404).json({
                            message : `cannot find any product with ID ${id}`
                        })
                    }
                    const updateProduct = await Product.findById(id)
                    res.status(200).json(updateProduct);
        }catch(error){
            res.status(500).json({message : error.message })
        }
    })


// delete a product ==========================================================================================

app.delete('/products/:id' ,  async(req , res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({
                message : `cannot find any product with ID ${id}`
            })
        }
        res.status(200).json(product);
    }
    catch (error){
        res.status(500).json({message : error.message })
    }
})



// Connecting the database to the  express=====================================================================

    mongoose.set('strictQuery' , false)



// mongodb Atlas====================================================================

    mongoose.connect('mongodb+srv://apis_Admin:mdazaz3@cluster0.jdnly3x.mongodb.net/apis_Admin?retryWrites=true&w=majority') 
    .then(()=>{
        console.log('Connected to MongoDB')

            
        app.listen( PORT , () => {
            console.log(`Node APIs App is Running on PORT ${PORT}`)
        })

    })
    .catch((error)=>{
        console.log('error')
    })
