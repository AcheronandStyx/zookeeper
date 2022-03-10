const express = require('express');

const PORT = process.env.PORT || 3001;
// We assign express() to the app variable so that we can later chain on methods to the Express.js server.
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// make a path a specific folder and instruct server to make its contents static resources which can be accessed without having a specific server endpoint created for it!
app.use(express.static('public'));

/*
telling the server that any time a client navigates to <ourhost>/api, 
the app will use the router we set up in apiRoutes.
If / is the endpoint, then the router will serve back our HTML routes.
*/
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//query parameters in the url will become JSON on the return
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
