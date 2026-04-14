const router = require('express').Router()
const Restaurant = require('../models/Restaurant');
const verifyToken = require('../middleware/verify-token');

//POST/restaurants/:id/menu-items
router.post('/:id/menu-items', verifyToken, async (req,res)=> {
    try{
        const foundRestaurant = await Restaurant.findById(req.params.id)
        if (!foundRestaurant.author.equals(req.user._id)){
            return res.status(403).json({err:'Unauthorized action on this Restaurant'})
       }

        foundRestaurant.menuItems.push(req.body)

        await foundRestaurant.save()
        res.status(201).json(foundRestaurant)
    }

    catch (err){
        console.log(err)
        res.status(500).json(err)
    }
})

//PUT    /restaurants/:id/menu-items/:menuItemId   // update menu item
router.put('/:id/menu-items/:menuItemId', verifyToken, async (req,res) => {
    try{
        const foundRestaurant = await Restaurant.findById(req.params.id)

        if(!foundRestaurant.author.equals(req.user._id)){
            return res.status(403).json ({err: 'Unauthorized action on this Restaurant'})
        }
    
        const foundMenuItem = foundRestaurant.menuItems.id(req.params.menuItemId)

        foundMenuItem.name = req.body.name
        foundMenuItem.price = req.body.price
        foundMenuItem.category = req.body.category

        await foundRestaurant.save()
        res.json(foundRestaurant)
    }
    catch (err){
        console.log(err)
        res.status(500).json(err)
    }
})

// DELETE /restaurants/:id/menu-items/:menuItemId  // delete menu item
router.delete('/:id/menu-items/:menuItemId', verifyToken, async (req,res) => {
try{
    const foundRestaurant = await Restaurant.findById(req.params.id)

    if(!foundRestaurant.author.equals(req.user._id)) {
        return res.status(403).json({err: 'Unauthorized action on this Restaurant'})
    }

    foundRestaurant.menuItems.id(req.params.menuItemId).deleteOne()
    await foundRestaurant.save()
    res.json(foundRestaurant)

}
catch (err){
    console.log(err)
    res.status(500).json(err)
}
})

module.exports = router;