const API_URL_RANDOM =
  "https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_Je2iJayLCJmORfO2DRBgtpj4HhyrRmjiiyeLO9MtQVkxryEFEsjd85f7xWVIzB2s";
const API_URL_FAVOURITES =
  "https://api.thedogapi.com/v1/favourites?api_key=live_Je2iJayLCJmORfO2DRBgtpj4HhyrRmjiiyeLO9MtQVkxryEFEsjd85f7xWVIzB2s";
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

    img1.src = data[0].url;
    img2.src = data[1].url;
  }
}

async function loadFavouriteDogs() {
  const response = await fetch(API_URL_FAVOURITES);
  if (response.status !== 200) {
    divError.innerHTML =
      "Hubo un error: " +
      response.status +
      " " +
      compareCodes(response.status).message;
  } else {
    const data = await response.json();
    console.log("Favorites");
    console.log(data);
  }
}

async function saveFavouriteDogs() {
  const res = await fetch(API_URL_FAVOURITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //Metodo stringify para que el backend pueda entender ya que el backend puede estar en otro lenguaje y se especifica un string
    body: JSON.stringify({
      image_id: '1Kri0eY18B',
    }),
  });
  
  console.log("Save");
  console.log(res);
  if (res.status !== 200) {
    divError.innerHTML = "Hubo un error: " + res.status + await res.text();
  }
  const data = await res.json();
}

loadRandomDogs();
loadFavouriteDogs();
