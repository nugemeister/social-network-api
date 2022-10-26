const express = require('express');
const db = require('./config/connection');
const thoughtController = require('./controllers/thought-controller');
const { Thought } = require('./models');
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
  res.status(419).send(new Error('oh no').message)
})
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () =>
    console.log(`Now listening: http://localhost:${PORT}`)
  );
});
