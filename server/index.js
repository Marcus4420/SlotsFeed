const express = require('express');
const cors  = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Slotshaven Feed 🏰'
    })
})

function isValidMsg(msg) {
    return msg.name && msg.name.toString().trim() != '' && msg.content && msg.content .toString().trim() != '' 
}

app.post('/messages', (req, res) => {
    if (isValidMsg(req.body)) {
    //Gør noget
    const msg = {
        name: req.body.name.toString(),
        content: req.body.content.toString() 
    }
    console.log(msg);
    } 
    else {
    res.status(422)
    res.json({
        message: 'Navn og indhold er nødvendigt'
    });
}
});

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
})