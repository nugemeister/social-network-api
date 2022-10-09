const express = require('express');
const app = express();
const routes = require('./routes');
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;


app.use(session(sess));
app.use(routes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


db.once('open', () => {
  app.listen(PORT, () =>
    console.log(`Now listening: http://localhost:${PORT}`)
  );
});
