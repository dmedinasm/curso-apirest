const API_URL_RANDOM =
  "https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_Je2iJayLCJmORfO2DRBgtpj4HhyrRmjiiyeLO9MtQVkxryEFEsjd85f7xWVIzB2s";
//const API_URL_FAVOURITES = "https://api.thedogapi.com/v1/favourites?limit=2";

const divError = document.getElementById("Error");
console.log(divError);
async function loadRandomDogs() {
  const response = await fetch(API_URL_RANDOM);
  const data = await response.json();
  console.log(data);
  console.log("Random");
  if (response.status !== 200) {
    divError.innerHTML = "Hubo un error: " + response.status;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");

    img1.src = data[0].url;
    img2.src = data[1].url;
  }
}

const API_URL_FAVOURITES = "https://api.thedogapi.com/v1/favourites?limit=2";

async function loadFavoritesDogs() {
  const response = await fetch(API_URL_FAVOURITES);
  const data = await response.text();
  if (response.status !== 200) {
    divError.innerHTML = "Hubo un error: " + response.status + data ;
  } 
}


loadRandomDogs();
loadFavoritesDogs();





