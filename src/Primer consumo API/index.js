console.log("Hello World");


const url = 'https://api.thedogapi.com/v1/images/search';

fetch(url)
   .then(res => res.json())
   .then(data => {
    const img = document.querySelector('img')
    img.src = data[0].url;
   });