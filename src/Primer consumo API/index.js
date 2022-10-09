const api = axios.create({
  baseURL: 'https://api.thedogapi.com/v1'
});

api.defaults.headers.common['X-API-KEY'] = 'live_Je2iJayLCJmORfO2DRBgtpj4HhyrRmjiiyeLO9MtQVkxryEFEsjd85f7xWVIzB2s'

const API_URL_RANDOM =
  "https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_Je2iJayLCJmORfO2DRBgtpj4HhyrRmjiiyeLO9MtQVkxryEFEsjd85f7xWVIzB2s";
const API_URL_FAVOURITES =
  "https://api.thedogapi.com/v1/favourites";
  const API_URL_FAVOURITES_DELETE =(id) =>
  `https://api.thedogapi.com/v1/favourites/${id}`;
  const API_URL_UPLOAD =
  "https://api.thedogapi.com/v1/images/upload";

const STATUS_CODES = [
  { message: "Unauthorized", status: 401 },
  { message: "Payment_Required", status: 402 },
  { message: "Forbidden", status: 403 },
  { message: "Not_Found", status: 404 },
  { message: "Internal_Server_Error", status: 500 },
  { message: "Not_Implemented", status: 501 },
  { message: "Bad_Gateway", status: 502 },
  { message: "Service_Unavaliable", status: 503 },
  { message: "Gateway_Timeout", status: 504 },
];

const compareCodes = (value) => {
  return STATUS_CODES.find((item) => item.status === value);
};

const divError = document.getElementById("Error");
console.log(divError);
async function loadRandomDogs() {
  const response = await fetch(API_URL_RANDOM);
  if (response.status !== 200) {
    divError.innerHTML = "Hubo un error: " + response.status;
  } else {
    const data = await response.json();
    console.log(data);
    console.log("Random");

    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');


    img1.src = data[0].url;
    img2.src = data[1].url;
// No poner la funcion saveFavorites directamente ya que las ejecuta no mas cargue la funcion(tiempo de depuracion para darse cuenta de eso)
    btn1.onclick = () => saveFavouriteDogs(data[0].id);
    btn2.onclick = () => saveFavouriteDogs(data[1].id);

  }
}

async function loadFavouriteDogs() {
  const response = await fetch(API_URL_FAVOURITES, {
    method: 'GET',
    headers:{
      'X-API-KEY': 'live_Je2iJayLCJmORfO2DRBgtpj4HhyrRmjiiyeLO9MtQVkxryEFEsjd85f7xWVIzB2s',
    }
  });
  if (response.status !== 200) {
    divError.innerHTML =
      "Hubo un error: " + response.status + " " + compareCodes(response.status).message;
  } else {
    const data = await response.json();
    console.log("Favorites");
    console.log(data);
    const section = document.getElementById('favoriteDogs');
    section.innerHTML = "";
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Dogs favoritos');
    h2.appendChild(h2Text);
    section.appendChild(h2);
    data.forEach(dogs => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Sacar al perro de favoritos');
      img.src = dogs.image.url
      img.width = 150;
      btn.onclick = () => deleteFavouriteDogs(dogs.id);
      btn.appendChild(btnText);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavouriteDogs(id) {

  const {data, status} = await api.post('/favourites',{
    image_id: id,
  });//Menos codigo usando libreria axios
  /*const res = await fetch(API_URL_FAVOURITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-API-KEY': 'live_Je2iJayLCJmORfO2DRBgtpj4HhyrRmjiiyeLO9MtQVkxryEFEsjd85f7xWVIzB2s'
    },
    //Metodo stringify para que el backend pueda entender ya que el backend puede estar en otro lenguaje y se especifica un string
    body: JSON.stringify({
      image_id: id,
    }),
  });*/

  console.log(data);
  console.log(status);
  //console.log(res);
  if (status !== 200) {
    divError.innerHTML = "Hubo un error: " + status + data.message;
  }
  console.log('Doggie agregado a favoritos');
  loadFavouriteDogs();
}


async function deleteFavouriteDogs(id){
  const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
    method: "DELETE",
    headers: {
      'X-API-KEY': 'live_Je2iJayLCJmORfO2DRBgtpj4HhyrRmjiiyeLO9MtQVkxryEFEsjd85f7xWVIzB2s'
    }
  });

  console.log("Delete");
  console.log(res);
  if (res.status !== 200) {
    divError.innerHTML = "Hubo un error: " + res.status + (await res.text());
  }else{
    console.log('Doggie eliminado de favoritos');
    loadFavouriteDogs();
  }
}

async function uploadDogPhoto(){
  const form = document.getElementById('uploadingDogFile');
  const formData = new FormData(form);
  console.log(formData.get('file'));
  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers:{
      //'Content-Type': 'multipart/form-data',
      'X-API-KEY': 'live_Je2iJayLCJmORfO2DRBgtpj4HhyrRmjiiyeLO9MtQVkxryEFEsjd85f7xWVIzB2s',
    },
    body: formData
  });
  if (res.status >= 400 ) {
    divError.innerHTML = "Hubo un error: " + res.status ;
  }
  const idData = (JSON.parse(await res.text())).id;
  console.log('Foto de Perro subida');
  saveFavouriteDogs(idData);
  }



loadRandomDogs();
loadFavouriteDogs();
