const router = require('express').Router();
const Board = require('../models/Board');
const User = require('../models/User')

// index
router.get('/', async (req, res) => {
    try{
        const usersId = req.session.usersId;
        const currentUserBoards = await User.findById(usersId)
            .populate({ path: 'boards' });
        const boards = await Board.find({});
        res.json({
            status: 200,
            data: currentUserBoards
        })

    } catch(err){
        res.json({
            status: 500,
            data: err
        })
    }
});

// new
router.post('/', async (req, res) => {
    try {
        const newBoard = await Board.create(req.body);
        const user = await User.findById(req.session.usersId)
        if(user){
            user.boards.push(newBoard)
        }
        await user.save()
        res.json({
            status: 200,
            data: newBoard,
            
        })

    } catch(err){
        console.log(err);
        res.json({
            status: 500,
            data: err
        })
    }
});

// edit
router.put('/:id', async (req, res) => {
    try{
        const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, {new: true})
        await updatedBoard.save();
        res.json({
            status: 200,
            data: updatedBoard
        })
    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            data: err
        })    
    }
});

// delete
router.delete('/:id', async (req, res) => {
    console.log('delete route');
    try{
        const deletedBoard = await Board.findByIdAndDelete(req.params.id);
        await updatedBoard.save();
        res.json({
            status: 200,
            data: deletedBoard
        })

    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            data: err
        })
    }
})

module.exports = router;