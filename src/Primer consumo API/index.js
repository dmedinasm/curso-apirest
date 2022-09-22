const url = "https://api.thedogapi.com/v1/images/search";

const boton = document.getElementById("boton");

boton.addEventListener("click", changePhoto);

async function fetchData(urlApi) {
  const response = await fetch(urlApi);
  const data = await response.json();
  const img = document.querySelector("img");
  img.src = data[0].url;
};

async function changePhoto(){
   try{
      await fetchData(url);
   }catch(error){
      console.error(error);
   }
};

changePhoto();


