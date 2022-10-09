// import Mongoose dependancy
const mongoose = require('mongoose');

// use local connection to MongoDB to use Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// export the connection
module.exports = mongoose.connection;