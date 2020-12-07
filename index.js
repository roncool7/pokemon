document.addEventListener("DOMContentLoaded", () => {
  let generateBtn = document.querySelector("#generate-pokemon");
  generateBtn.addEventListener("click", renderEverything);
  getResetBtn().addEventListener("click", resetEverything);
});

function renderEverything() {
  let allPokemonContainer = document.querySelector("#poke-container");
  allPokemonContainer.innerText = "";
  fetchKantoPokemon();
  getResetBtn().style.display = "block";
}

function getResetBtn() {
  return document.querySelector("#reset-btn");
}

function fetchKantoPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then(function (allpokemon) {
      allpokemon.results.forEach(function (pokemon) {
        fetchPokemonData(pokemon);
      });
    });
}

function fetchPokemonData(pokemon) {
  let url = pokemon.url;
  fetch(url)
    .then((response) => response.json())
    .then(function (pokeData) {
      renderPokemon(pokeData);
    });
}

function renderPokemon(pokeData) {
  let allPokemonContainer = document.getElementById("poke-container");
  let pokeContainer = document.createElement("div");
  pokeContainer.classList.add("ui", "card");
  createPokeImage(pokeData.id, pokeContainer);
  let pokeName = document.createElement("h2");
  pokeName.innerText = pokeData.name;
  let pokeNumber = document.createElement("p");
  pokeNumber.innerText = `Pokemon ID: ${pokeData.id}`;
  let pokeTypes = document.createElement("ul");
  createTypes(pokeData.types, pokeTypes);
  pokeContainer.append(pokeName, pokeNumber, pokeTypes); 
  allPokemonContainer.appendChild(pokeContainer);
}

function createTypes(types, ul) {
  types.forEach(function (type) {
    let typeLi = document.createElement("li");
    typeLi.innerText ="Type: " + type["type"]["name"];
    ul.append(typeLi);
  });
}

function createPokeImage(pokeID, containerDiv) {
  let pokeImgContainer = document.createElement("div");
  pokeImgContainer.classList.add("image");
  let pokeImage = document.createElement("img");
  pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`;
  pokeImgContainer.append(pokeImage);
  containerDiv.append(pokeImgContainer);
}

function resetEverything(event) {
  event.target.style = "none";
  let allPokemonContainer = document.querySelector("#poke-container");
  allPokemonContainer.innerHTML = "";
  let generateBtn = document.createElement("button");
  generateBtn.innerText = "Generate Pokemon";
  generateBtn.id = "generate-pokemon";
  generateBtn.style.marginTop = "100px"
  generateBtn.classList.add("ui", "secondary", "button");
  generateBtn.addEventListener("click", renderEverything);
  allPokemonContainer.append(generateBtn);
}
