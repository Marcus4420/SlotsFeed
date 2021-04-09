const port = process.env.PORT || 5000;
const express = require('express');
const cors  = require('cors');
const monk = require('monk');
const path = require('path');
const Filter = require('bad-words');


const app = express();
const db = monk(process.env.MONGO_URI || 'localhost/slotsfeed');
const msgs = db.get('msgs');
const filter = new Filter();



app.use(cors());
app.use(express.json());
app.use(express.static(__dirname+'/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
})

app.get('/slotsfeed', (req, res) => {
    msgs
        .find()
        .then(msgs => {
            res.json(msgs);
        })
})

function isValidMsg(msg) {
    return msg.name && msg.name.toString().trim() != '' && msg.content && msg.content .toString().trim() != '' 
}

app.post('/slotsfeed', (req, res) => {
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