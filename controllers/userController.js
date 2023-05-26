const {User, Thought} = require('../models/')

module.exports = {
    async getAllUsers(req,res) {
        try {
            const users = await User.find()
            res.json(users)
        }
        catch (err) {
            res.status(500).json(err);
        }

    },
    async getUser(req,res) {
        try {
            const user = await User.findOne({_id: req.params.id});
            if (!user) {
                return res.status(404).json({message: "No user found with this ID"})
            }
            res.json(user)
        }
        catch (err) {
            res.status(500).json(err);
        }

    },
    async createUser(req,res) {
        try{
            const user = await User.create(req.body);
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }

    },
    async updateUser(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id:req.params.id},
                req.body,
                {new: true, runValidators: true}
                )
            if(!user) {
                res.status(404).json({message: "No user found with this ID"})
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req,res) {
        try {
            const user = await User.findOneAndDelete({_id: req.params.id});
            if(!user) {
                res.status(404).json({message: "No user found with this ID"});
            }
            res.json({message: "User deleted"})
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //needs to friend from the other friend?
    async addFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id:req.params.userId},
                {$addToSet: {friends: req.params.friendId}},
                {new: true}
                )
                //console.log(user)
            if(!user) {
                res.status(404).json({message: "No user found with this ID"})
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id:req.params.userId},
                {$pull: {friends: req.params.friendId}},
                )
            if(!user) {
                res.status(404).json({message: "No user found with this ID"})
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}