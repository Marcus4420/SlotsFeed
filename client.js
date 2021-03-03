console.log("Client is loaded");

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/messages';

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
    });
});