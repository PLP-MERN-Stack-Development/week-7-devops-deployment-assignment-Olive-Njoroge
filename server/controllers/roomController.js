const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
    try{
        const {name} = req.body;
        const room = await Room.create({name});
        res.json(room);

    }catch(error){
        res.status(500).json({message: "couldn't create room"});

    }
};

exports.getRooms = async (req, res) => {
    try{
        const rooms = await Room.find();
        res.json(rooms);
    }catch(error){
        res.status(500).json({error: error.message})
    }

}