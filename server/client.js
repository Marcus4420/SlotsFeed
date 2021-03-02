console.log("Client is loaded");

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/posts'

loadingElement.style.display = 'none'

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    console.log('form was submitted');
    const name = formData.get('name');
    const content = formData.get('content');
    const msg = {
        name,
        content
    }
    form.style.display = 'none'
    loadingElement.style.display = ''

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(msg),
        headsers: {
            'content-type': 'application/json'
        }
    });
});