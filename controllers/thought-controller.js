const {Thought, Reaction, User} = require('../models');

const thoughtController = {
    // Get all Thoughts
    getThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },

    // Get Thought by ID
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thoughtData) =>
           !thoughtData
                ? res.status(404).json({message: 'Please enter a valid thought ID.'})
                : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Create a Thought
    createThought (req, res) {
        Thought.create(req.body)
            .then((thoughtData) => {
                return User.findOneAndUpdate(
                    { username: req.body.username},
                    {$addToSet: {thoughts: thoughtData._id}},
                    {new: true}
                );
            })
            .then((userData) =>
               !userData
                    ? res.status(404).json({message: 'Please enter a valid user ID.'})
                    : res.json({message: 'The thought has been created!'})
            )
            .catch((err) => res.status(500).json(err));
    },

    // Update a Thought using a User ID
    updateThought (req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body}, {new: true, runValidators: true})
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({message: 'Please enter a valid thought ID.'})
                    : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Delete a Thought (+ remove from assoc. user)
    deleteThought (req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({message: 'Please enter a valid thought ID.'})
                    : User.findOneAndUpdate({thoughts: req.params.thoughtId}, {$pull: {thoughts: req.params.thoughtId}}, {new: true})
            )
            // Remove a Thought from a Specific User
            .then((userData) =>
                !userData
                    ? res.status(404).json({message: 'Invalid user ID, thought has been deleted.'})
                    : res.json({message: 'The selected thought has been deleted.'})
            )
            .catch((err) => res.status(500).json(err));
    },

    // Add a Reaction to a Thought
    addReaction(req , res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$addToSet: {reactions: req.body}}, {new: true, runValidators: true})
        .then((thoughtData) =>
            !thoughtData
                ? res.status(404).json({message: 'Please enter a valid thought ID.'})
                : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Delete a Reaction from a Thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: {reactionId: req.params.reactionId}}}, {new: true, runValidators: true})
        .then((thoughtData) =>
            !thoughtData
                ? res.status(404).json({message: 'Please enter a valid thought ID.'})
                : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
    },
};

// export
module.exports = thoughtController;