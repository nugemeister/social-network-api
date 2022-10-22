const {User, Thought} = require('../models');

const userController = {
    // Get all Users
    getUsers (req, res) {
        User.find({})
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },

    // Get a User by ID
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .populate('thoughts friends')
            .then((userData) =>
                !userData
                    ? res.status(404).json({ message: 'Please enter a valid user ID.'})
                    : res.json(userData)
            )
            .catch(err => res.status(500).json(err));
    },

    // Create a User
    createUser (req, res) {
        User.create(req.body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },

    // Update a User by ID
    updateUser (req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {new: true, runValidators: true})
            .then((userData) => 
                !userData
                    ? res.status(404).json({message: 'Please enter a valid user ID.'})
                    : res.json(userData)
            )
            .catch(err => res.status(500).json(err));
    },

    // Delete a User
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
            .then(userData => {
                if(!userData) {
                    res.status(404).json({message: 'Please enter a valid user ID.'});
                    return;
                }
                // Delete the User's associated Thoughts
                return Thought.deleteMany({_id: {$in: userData.thoughts}});
            })
            .then(() => res.json({message: 'The selected user and their associated thoughts have been deleted.'}))
            .catch(err => res.status(500).json(err));
    },

    // Add a Friend to User's Friend List by ID
    addFriend({params}, res) {
        User.findOneAndUpdate({_id: params.userId}, {$addToSet: {friends: params.friendId}}, {new: true})
            .then(userData => {
                if(!userData) {
                    res.status(404).json({message: 'Please enter a valid user ID.'});
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    },

    // Remove a Friend from a User's Friend List by ID
    removeFriend({params}, res) {
        User.findOneAndUpdate({_id: params.userId}, {$pull: {friends: params.friendId}}, {new: true})
            .then(userData => {
                if(!userData) {
                    res.status(404).json({message: 'Please enter a valid user ID.'});
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    }
};

// export
module.exports = userController;