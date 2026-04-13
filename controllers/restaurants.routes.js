const router = require('express').Router();
const Resturents = require('../models/Resturents');
const verifyToken = require('../middleware/verify-token');

// GET /restaurants
router.get('/', async (req,res)=>{
    try{
        const foundResturents = await Resturents.find({}).populate('author', 'username').populate('reviews').populate('menu')
        res.status(200).json({resturents:foundResturents})
    }
    catch(err){
        console.log(err)
        res.status(500).json({err:err.message})
    }
})

// POST /restaurants
router.post('/', verifyToken, async (req,res)=>{
    try{
        const createdResturents = await Resturents.create({
            name:req.body.name,
            location:req.body.location,
            cuisine:req.body.cuisine,
            logourl:req.body.logourl,
            author:req.user._id
        })
        res.status(201).json({resturents:createdResturents})
    }
    catch(err){
        console.log(err)
        res.status(500).json({err:err.message})
    }
})
// GET /restaurants/:id
router.get('/:id', async (req,res)=>{
    try{
        const foundResturents = await Resturents.findById(req.params.id).populate('author', 'username').populate('reviews').populate('menu')
        res.status(200).json({resturents:foundResturents})
    }
    catch(err){
        console.log(err)
        res.status(500).json({err:err.message})
    }
})

// DELETE /restaurants/:id
router.delete('/:id', verifyToken, async (req,res)=>{
    try{
        const deletedResturents = await Resturents.findByIdAndDelete(req.params.id)
        res.status(200).json({resturents:deletedResturents})
    }
    catch(err){
        console.log(err)
        res.status(500).json({err:err.message})
    }
})

// PUT /restaurants/:id
router.put('/:id', verifyToken, async (req,res)=>{
    try{
        const updatedResturents = await Resturents.findByIdAndUpdate
        (req.params.id, req.body, {new:true})
        res.status(200).json({resturents:updatedResturents})
    }
    catch(err){
        console.log(err)
        res.status(500).json({err:err.message})
    }
})


module.exports = router