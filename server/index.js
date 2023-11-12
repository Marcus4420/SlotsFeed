//Sørger for vi kører på den rigtige port. Procc... når vi er på den officielle og 5000 i dev mode
const port = process.env.PORT || 5000;
//Express som vi bruger til routing get/post mm.
const express = require('express');
//Cors middleware til express (Cross-origin resource sharing)
const cors  = require('cors');
//Monk er et vilkårligt mongoDB library
const monk = require('monk');
//Path hjælper os med at navigere rundt i filerne
const path = require('path');
//Language filter.. for min egen skyld :)
const Filter = require('bad-words');
//URI fra hosten, til vores dejlige mongoDB datbase.
const uri = "mongodb+srv://MarcusElle:ellested34@slotsfeed.jfwjt.mongodb.net/?retryWrites=true&w=majority";

//Initialiserer end masse af det vi lige sagde ovenover
const app = express();
const db = monk(uri || 'localhost/slotsfeed');
const msgs = db.get('slotsfeed');
const filter = new Filter();


//Samme som ovennævnte
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.static(__dirname+'/public'));

//Når vi bliver spurgt efter root. Basically når vi navigerer til siden.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
})

//Når den får en request på /slotsfeed.
app.get('/slotsfeed', (req, res) => {
    //msgs er det, som beskederne hedder 
    msgs
    //Find alle beskeder,, og svar derefter med alle beskederne som json
        .find()
        .then(msgs => {
            res.json(msgs);
        })
})

//Check om det er en reel besked.. Lidt database beskyttelse
function isValidMsg(msg) {
    return msg.name && msg.name.toString().trim() != '' && msg.content && msg.content.toString().trim() != '' 
}

//Når vi får en post request til /slotsfeed
app.post('/slotsfeed', (req, res) => {
    //Check om json objektets body er gyldigt i vores algoritme
    if (isValidMsg(req.body)) {
    //Indsæt i database
    const msg = {
        name: filter.clean(req.body.name.toString()),
        content: filter.clean(req.body.content.toString()),
        created: new Date()
    }
    msgs
        .insert(msg)
        .then(createdMsg => {
        res.json(createdMsg);
    })
    } 
    else {
    res.status(422)
    res.json({
        message: 'Navn og indhold er nødvendigt'
    });
}
});


app.listen(port, () => {
    console.log('Listening on http://localhost:5000');
})
