const POKEAPI = "https://pokeapi.co/api/v2"
let pokedex;

async function start() {
  $("#catch").on("click", pressButton)
}

async function pressButton() {
  await createPokedex();
  let pokeList = pickPokemon(3, pokedex);
  let pokemons = await catchPokemon(pokeList);
  for (let p of pokemons) {
    let pokemon = await inspectPokemon(p);
    $("#poke-area").append(`
      <div class="pokemon"><h3>${pokemon.name}</h3><p>${pokemon.flavor_text}</p></div>
    `)
  }
}

async function createPokedex() {
  pokedex = await axios.get(`${POKEAPI}/pokemon?limit=10000`)
    .then( (response) => {return response.data.results});
}

function pickPokemon(num, source) {
  let pokeUrls = [];
  for (let i = 0; i< num; i++) {
    let idx = Math.floor(Math.random() * source.length)
    let url = source[idx]["url"]
    pokeUrls.push(axios.get(`${url}`));
  }
  return pokeUrls;
}

async function catchPokemon(pokeList) {
  let pokemons = await axios.all(pokeList).then(respArr => {
    return respArr.map(resp => resp.data)
  });
  return pokemons;
}

async function inspectPokemon(inputPokemon) {
  let pokemon = {
    "name": inputPokemon.name,
  }

  let flavorTexts = await axios.get(`${inputPokemon.species.url}`)
  .then(response => response.data.flavor_text_entries);

  for (let entry of flavorTexts) {
    if (entry.language.name === "en") {
      pokemon["flavor_text"] = entry.flavor_text;
      break;
    } 
  }

  return pokemon;
}




$(start)