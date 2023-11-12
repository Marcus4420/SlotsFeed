//Sikrer os at client.js er loaded
console.log("Client is loaded");

//Finder det første objekt i dokumentet, der matcher query - OBS FØRSTE
const form = document.querySelector('form');
//Samme som ovennævnte
const loadingElement = document.querySelector('.loading');
//Samme som ovennævnte
const msgsElement = document.querySelector('.msgs')
//Vores 'API URL' som er linket til den deployede side, på /slotsfeed
const API_URL = 'http://localhost:5000/slotsfeed';

//Kalder funktionen der skaffer alle nuværende beskeder. (Findes i client.js)
listAllMessages();

//Skjuler vores loader, så snart alle beskederne er loadet.
loadingElement.style.display = 'none'

//Tager formen og lytter efter en handling (i dette tilfælde ved submit) og gør derefter et event. Eventet skal komme i form af en js funktion (arrow function her)
form.addEventListener('submit', (event) => {
    //Stopper det, at hvis ikke vi gør noget så den ikke tage sin default handling
    event.preventDefault();
    //Sikrer os at det virker og formen er gået igennem
    console.log('form was submitted')

    //En masse nye variabler som vi skal lege med senere (FormData er dog objekt)
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    //Laver et objekt med de 2 ønskede ting :)
    const msg = {
        name,
        content
    };
    //Lad os se det!
    console.log(msg);


    //Gem formen og frem med loading elementet
    form.style.display = 'none'
    loadingElement.style.display = ''


    //Fetcher siden API_URL.
    fetch(API_URL, {
        //Post request, altså at vi sender noget.
        method: 'POST',
        //Det vi sender, har en body af msg, men det bliver konverteret til json
        body: JSON.stringify(msg),
        //Giver siden besked om at vi sender JSON
        headers: {
            'content-type': 'application/json'
        }
        //Laver den server respons vi får, til json
    }).then(response => response.json())
    //Console.log responsen som er en ny besked
    .then(createdMsg => {
        console.log(createdMsg);
        //Sletter teksten i formen, for at man kan skrive en ny besked
        form.reset();
        //Bringer formen tilbage og skjuler loaderen
        form.style.display = '';
        loadingElement.style.display = 'none';
        //Henter beskederne igen :)
        listAllMessages();
    })
});


function listAllMessages() {
    //Referer til at du kunne gøre dette bedre
    msgsElement.innerHTML = '';
    //Fetch fra API URL igen
    fetch(API_URL)
        //Json-fiser det
        .then(response => response.json())
        //Tag alle msgs som et samlet objekt
        .then(msgs => {
            //Vend dem om, så den nyeste er først
            msgs.reverse();
            //Tag alle msg i msgs og gør:
            msgs.forEach(msg => {
                const div = document.createElement('div');
                const header = document.createElement('h3');
                header.textContent = msg.name;
                const contents = document.createElement('p');
                contents.textContent = msg.content;
                const date = document.createElement('small');
                date.textContent = new Date(msg.created);
                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date)
                msgsElement.appendChild(div);
            })
        });
}
