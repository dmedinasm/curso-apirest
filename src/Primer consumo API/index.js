const urlApi= "https://api.thedogapi.com/v1/images/search?limit=3&api_key=live_Je2iJayLCJmORfO2DRBgtpj4HhyrRmjiiyeLO9MtQVkxryEFEsjd85f7xWVIzB2s";

async function reload() {
   try {
  const response = await fetch(urlApi);
  const data = await response.json();
  console.log(data);
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");
   img1.src = data[0].url;
   img2.src = data[1].url;
   img3.src = data[2].url;
   } catch(error){
      console.error(error);
   }
};


reload();

