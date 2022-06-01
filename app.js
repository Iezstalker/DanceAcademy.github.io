const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
const port = 8000;


// Define Mongoose Schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);

//Express SPecific Stuff
// for serving static files
app.use('/static', express.static('static'))

app.use(express.urlencoded())

//PUG Specific Stuff
// set the template engine as pug
app.set('view engine', 'pug');

// Set the views directory
app.set('views', path.join(__dirname, 'views'))

// Endpoints
// our pug demo endpoint
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")}).catch(()=>{
            res.status(400).send("Item has not been saved to the database")
        });

    // res.status(200).render('contact.pug');
})

//Start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
});