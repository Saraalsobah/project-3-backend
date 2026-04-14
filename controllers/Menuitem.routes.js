const router = require('express').Router()
const Restaurant = require('../models/Restaurant')
const verifyToken = require('../middleware/verify-token');
const Restaurant = require('../models/Resturents');

//POST/restaurants/:id/menu-items
router.post('/:id/menu-item', verifyToken ,async (req,res)=> {
    try{
        const foundRestaurantt=await Restaurant.findById(req.params.id);

       if (!foundRestaurant.author.equals(req.user._id)){
        return res.status(403).json({err:'Unauthorized add on this Restaurant'})
       }
foundRestaurant.menuitems.push(req.body)
await foundRestaurantt.save()
res.json(foundRestaurant)
    }

catch (err){
    console.log(err)
    res.status(500).json(err)
}
})

//PUT    /restaurants/:id/menu-items/:itemId   // update menu item
router.put('/:id/menu-item/:menuitemId',verifyToken,async (req,res) => {
try{
    const foundRestaurant = await Restaurant.findById(req.params.id)

    if(!foundRestaurant.auther.equals(req.user._id)){
returnres.status(403).json ({err: 'Update in this Restaurant'})
    }
  
const foundMenuItem = foundRestaurant.menuitem.id(req.params.menuitemId)

foundMenuItem.name = req.body.name
foundMenuItem.price = req.body.price
foundMenuItem.category = req.body.category

await foundRestaurantt.save()
res.json(foundRestaurant)
}
catch (err){
    console.log(err)
    res.status(500).json(err)
}
})

// DELETE /restaurants/:id/menu-items/:itemId   // delete menu item
router.delete('/:id/menu-item/:menuitemId',verifyToken,async (req,res) => {
try{
    const foundRestaurant = await Restaurant.findById(req.user._id)

       if(!foundRestaurant.auther.equals(req.user._id)){
        return res.status(403).json({err: 'Delete onthis restaurent'})
       }

foundRestaurant.menuitems.id(req.params.menuitemId).deleteOne()
res.json(foundRestaurant)

    }
    catch (err){
        console.log(err)
        res.status(500).json(err)
    }
})