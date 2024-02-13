//we first required express, below is code very imp code
const express = require('express');
const router = express.Router();

const Person = require('./../models/Person')


router.post('/', async(req, res) => {
    try {
        const data = req.body
        const newPerspn = new Person(data);

        const response  = await newPerspn.save();
        console.log('Data Saved');
        res.status(200).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.get('/', async(req,res) => {
    try {
        const data = await Person.find();
        console.log('Data Fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.get('/:workType', async (req,res) => {
    const workType = req.params.workType;
    
    try {
        if(workType== 'chef' || workType== 'manager' || workType=='waiter'){
            const response = await Person.find({work: workType});
            console.log(response);
            res.status(200).json(response);
        }
        else {
            res.status(404).json({error: 'Invalid Work Type'});
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
    })


    //update the documnet record of Person
    router.put('/:id', async (req,res) => {
        try {
            const personId = req.params.id;
            const updatedData = req.body();

            const response = await Person.findByIdAndUpdate(personId, updatedData, {
                new: true,
                runValidators: true,
            })
            if(!response){
               return res.status(404).json({error: 'Person Not Found'});
            }
            console.log(response);
            res.status(200).json(response);
            
        }
        catch(err) {
            console.log(err);
            res.status(500).json({error: 'Internal Server Error'})
        }
    })


    //delete the record from document 
    router.delete('/:id', async(req,res) => {
        try {
            const getId = req.params.id;
            const  response = await Person.findByIdAndDelete(getId);

            if(!response) {
                return res.status(404).json({error: 'Data not found'})
            }
            console.log('data deleted');
            res.status(200).json({message: 'Successfull'});
        }
        catch(err) {
            console.log(err);
            res.status(500).json(response);
        }
    })
    //now we will export router 

module.exports = router;