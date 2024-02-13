const express = require('express');

const router = express.Router();

const MenuItem = require('./../models/MenuItem');

router.get('/menu', async(req,res) => {
    try {
        const data = await MenuItem.find();
        console.log('Data Fetched');
        res.status(200).json(data);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.post('/menu', async(req,res) => {
    try {
        const data = req.body
        const newMenu = new MenuItem(data);

        const response = await newMenu.save();
        console.log('Data Added');
        res.status(200).json(response)
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.get('/menu/:tasteType', async (req,res) => {
    const tasteType = req.params.tasteType;
    try {
            if(tasteType=='spicy' || tasteType== 'sweet' || tasteType== 'sour'){
               const response = await MenuItem.find({taste: tasteType});
               console.log(response);
               res.status(200).json(response); 
            }
            else {
                res.status(404).json({error: 'Inavalid taste Type'})
            }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async (req,res) => {
    try {
        const getId = req.params.id;
        const dataUpdated = req.body();

        const response = await MenuItem.findByIdAndUpdate(getId,dataUpdated, {
            new: true,
            runValidaors: true,
        })

        if(!response){
            res.status(404).json({error: 'Menu Not Found'});
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//now delete the document record 

router.delete('/:id', async (req,res) => {
    try {
        const gettheId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(gettheId);

        if(!response){
            return res.status(404).json({error: 'data not found'})
        }
        console.log(response);
        res.status(200).json({message: 'Done action'})

    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Action not Completed'})
    }
})


// export the router 

module.exports = router;