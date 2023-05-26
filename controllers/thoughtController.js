const {Thought, User} = require("../models")

module.exports = {
    async getAllThoughts(req,res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    async getThought(req,res) {
        try {
            const thought = await Thought.findOne({_id: req.params.id})
            if (!thought) {
                res.status(404).json({message: "Thought not found"})
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createThought(req,res) {
        try {
            const thought = await Thought.create(req.body);
            console.log(thought._id)
            
            const user = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: thought._id}},
                {new: true}
            )
            if (!user) {
                res.status(404).json("User not found")
            }
            res.json(user);
        } catch (err) {
            
            res.status(500).json(err)
        }
    },
    async updateThought(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id:req.params.id},
                req.body,
                {new:true, runValidators: true}
            )
            if (!thought) {
                return res.status(404).json({message: "Thought not found"});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteThought(req,res) {
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.id})
            const user = await User.findOneAndUpdate(
                {_id: thought.userId}, 
                {$pull: {thoughts: {_id: thought._id}}}
                )
            if(!thought) {
                return res.status(404).json({message: "Thought not found"});
            }
            if (!user) {
                res.status(404).json({message: "User not found"})
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async addReaction(req,res) {
        try {
            
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$push: {reactions: req.body}}, 
                {new: true}
            )
            if(!thought) {
                res.status(404).json({message: "Thought not found"})
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeReaction(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions:{_id: req.params.reactionId}}},
                {new: true}
            )
        } catch (err) {
            res.status(500).json(err)
        }
    }
}