// create and instance of router.  This allows us to split API paths off into thier own file.  if use app we're 
// creating a new instance of app in every file and that breaks the program
const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

/*
get() method requires two arguments. The first is a string that describes the route the client will have to fetch from. 
The second is a callback function that will execute every time that route is accessed with a GET request.

The second takeaway is that we are using the send() method from the res parameter (short for response) to send the string Hello! to our client.
*/

router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/animals', (req, res) => {
    // set id based on what the next index of the array will be
    // length is one number ahead of the array index, so perfect for setting the unique ID
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports  = router;