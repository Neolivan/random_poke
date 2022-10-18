
let pokemonList = []


async function getPokeList(){
   await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1154").then((T) => T.json())
    .then((resp) => {
      pokemonList = resp.results
    })

}

async function getPkemon(){
    let index = Math.floor(Math.random() * 1151) + 1;
    let shineLucky =  Math.floor(Math.random() * 11)
    if(index > 905){
        if(index < 10001){
            if(index < 1000){
                index = Math.floor(Math.random() * 904) + 1
            }else{
                index = 10020
            }
        }
    }
    let shine = shineLucky == 1? true : false
    await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`).then((T) => T.json())
    .then((resp) => {
        let pokeImg = resp.sprites.front_default
        console.log(index)
        if(!pokemonList[index -1].name){
            return false
        }
        if(shine){
            document.getElementById('poke-name').innerHTML = `⭐ ${pokemonList[index -1].name} ⭐`;
        }else{
            document.getElementById('poke-name').innerHTML = pokemonList[index -1].name;
        }
        if(pokeImg){
            if(shine){
                document.getElementById('poke-img').setAttribute('src', resp.sprites.front_shiny)
            }else{
                document.getElementById('poke-img').setAttribute('src', pokeImg)
            }
        }else{
            document.getElementById('poke-img').setAttribute('src', './assets/pokemon.jpg')

        }
    })
}

async function _init_(){
    await getPokeList()
    getPkemon()

}

async function refresh(){
    await getPkemon()
}

_init_()

document.querySelector('#refresh').addEventListener("click",refresh);

