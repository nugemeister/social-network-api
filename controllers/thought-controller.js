const {Thought, User} = require('../models');

const thoughtController = {
    // Get all Thoughts
    getThoughts (req, res) {
        Thought.find({})
        .select('-__v')
        .sort({createdAt: -1})
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(500).json(err));
    },

    // Get Thought by ID
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.thoughtId})
        .select('-__v')
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({message: 'Please enter a valid thought ID.'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(500).json(err));
    },

    // Create a Thought
    createThought (req, res) {
        Thought.create(req.body)
            .then(thoughtData => {
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$push: {thoughts: thoughtData._id}},
                    {new: true}
                );
            })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({message: 'Please enter a valid user ID.'});
                    return;
                }
                res.json({message: 'The thought has been created!'});
            })
            .catch(err => res.status(400).json(err));
    },

    // Update a Thought
    updateThought ({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true, runValidators: true})
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({message: 'Please enter a valid thought ID.'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(500).json(err));
    },

    // Delete a Thought
    deleteThought ({params}, res) {
        Thought.findOneAndRemove({_id: params.thoughtId})
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({message: 'Please enter a valid thought ID.'});
                    return;
                }
            // Remove a Thought from a Specific User
                return User.findOneAndUpdate({thoughts: params.thoughtId}, {$pull: {thoughts: params.thoughtId}}, {new: true});
            })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({message: 'Please enter a valid user ID.'});
                    return;
                }
                res.json({message: 'The selected thought has been deleted.'});
            })
            .catch(err => res.status(500).json(err));
    },

    // Add a Reaction to a Thought
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$addToSet: {reactions: body}}, {new: true, runValidators: true})
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({message: 'Please enter a valid thought ID.'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(500).json(err));
    },

    // Delete a Reaction from a Thought
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new: true, runValidators: true})
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({message: 'Please enter a valid thought ID.'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(500).json(err));
    }
};

// export
module.exports = thoughtController;