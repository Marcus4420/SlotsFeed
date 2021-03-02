console.log("Client is loaded");

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');

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
    console.log(msg);
    form.style.display = 'none'
    loadingElement.style.display = ''
});