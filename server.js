const express = require('express');
const app = express();

app.get( '/' , (req , res) =>{
    res.send('Hello Node APIs')
})

app.listen( 3000 , () => {
    console.log(`node API app is running on port 3000`)
})