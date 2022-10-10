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


    // Update a Thought


    // Delete a Thought


    // Add a Reaction to a Thought


    // Delete a Reaction from a Thought


};

// export
module.exports = thoughtController;