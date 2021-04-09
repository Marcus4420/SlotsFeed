console.log("Client is loaded");

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const msgsElement = document.querySelector('.msgs')
const API_URL = 'http://localhost:5000/slotsfeed' || 'https://slotsfeed.herokuapp.com/slotsfeed';

listAllMessages();

loadingElement.style.display = 'none'

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('form was submitted')
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const msg = {
        name,
        content
    };

    form.style.display = 'none'
    loadingElement.style.display = ''

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(msg),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
    .then(createdMsg => {
        console.log(createdMsg);
        form.reset();
        form.style.display = '';
        loadingElement.style.display = 'none';
        listAllMessages();
    })
});


function listAllMessages() {
    msgsElement.innerHTML = '';
    fetch(API_URL)
        .then(response => response.json())
        .then(msgs => {
            msgs.reverse();
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
                div.style.border = 'Solid';
                div.style.margin = '2%';
                div.style.padding = '1%';
                div.style.display = 'block';


                msgsElement.appendChild(div);
            })
        });
}
