const router = require('express').Router();
const mongoose = require ('mongoose');
const Dev = require ('../models/developer')


//getting all the developers
router.get('/all-dev', async(req,res)=>{
    try {
        const allDev = await Dev.find();
        res.status(200).json(allDev);
        
    } catch (err) {
        res.status(400).json({message : 'error'});
        
    }
});






// creating a developer
router.post('/add', async(req,res)=>{
    try {
        const newDeveloper = await Dev.create(req.body);
        res.status(201).json({message : 'success!'})
        
    } catch (err) {
        res.status(400).json({message : 'Error'});
    }
});




//updating a developer
router.patch('/update/:id', async(req,res)=>{
    try {
        //finding the id
        const {id : _id} = await req.params; 

        //storing the updated data
        const updatedData = await req.body;

        //handling wrong id's
        if(!mongoose.Types.ObjectId.isValid(_id)){
            res.status(400).json({message : 'Id not found'});
        };

        //finding user by id and updating it's data
        const updatedDeveloper = await Dev.findByIdAndUpdate(_id, {...updatedData, _id})//using spread operator to make a copy of the whole data so that it should not get removed while updating
        res.status(200).json({message : 'success!'})

    } catch (err) {
       res.status(400).json({message : 'Error'}); 
    }
});




//delete a developer
router.delete('/delete/:id', async (req,res)=>{
    try {
        const {id : _id} = await req.params;

        if(!mongoose.Types.ObjectId.isValid(_id)){
            res.status(400).json({ message : 'Invalid Id'});
        }

        const deleteDev = await Dev.findByIdAndRemove(_id);
        res.status(200).json({message : 'Success!'})
    } catch (err) {
        res.status(400).json({ message : 'Error Deleting Id'});
        
    }
});





//get only one developer
router.get('/:id', async(req,res) => {
    try {
        const developer = await Dev.findById(req.params.id);
        res.status(200).json(developer);
    } catch (err) {
        res.status(400).json({message : 'error'});
    }
});

//exporting the router
module.exports = router;