const pokemonLi = document.getElementById("pokemonList")
const pokemonDetail = document.getElementById("pokemonDetail")
const loadMoreButton = document.getElementById("loadMoreButton")
const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
const limit = 20;
let offset = 0;

function displayCard() {
    
        pokemonDetail.style.display = "none"
   
}

function cardModal(id) {
    
    pokemonDetail.style.display = "block"

    pokeAPI.getPokemon(id)
        .then((pokemon) => {
            const newHtml = `
            <div class="container__card ${pokemon.type}">
            <svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="-300 0 950 270" >
                <path d="M-314,267 C105,364 400,100 812,279" fill="none" stroke="white" stroke-width="120" stroke-linecap="round"/>
              </svg>
              <div class="details__card ">
                <?xml version="1.0" ?><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" onclick="displayCard()" class="back"><title/><g data-name="Layer 2" id="Layer_2"><path d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"/></g></svg>
                <div class="header__details detail">
                    <p>${pokemon.name}</p>
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <div class="status__details ">
                    <div class="status">
                        <p>Experience</p>
                        <p>${pokemon.xp}</p>
                    </div>
                    <div class="status">
                        <p>Height</p>
                        <p>${pokemon.height}</p>
                    </div> 
                    <div class="status">
                        <p>Weight</p>
                        <p>${pokemon.weight}</p>
                    </div>
                </div>
                
    
              </div>
              <div class="pokemon__card">
                <img src="${pokemon.photo}"
                alt="${pokemon.name}">
              </div>
        </div>

            `
            pokemonDetail.innerHTML = newHtml

        })
        console.log(id);
}

function loadPokemonItens(offset, limit) {

    pokeAPI.getPokemons(offset,limit).then((pokemonList) => {
        const newHtml = pokemonList.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" dataset="${pokemon.number}" onclick="cardModal(${pokemon.number})">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
    
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>


          
            
        `

        ).join('')

       // console.log(typeof newHtml);

        var poketest = []

        pokemonLi.innerHTML += newHtml
        /*
                //Seleciona o pokemon clicado
                const pokemonDetalhamento = document.querySelectorAll(".pokemon") //Buscar todos os itens que tem a classe pokemon
                pokemonDetalhamento.forEach(pokemonAtribu => { //percorre as classes
                    pokemonAtribu.addEventListener('click', () => { //Evento de click
                        const poke_id = pokemonAtribu.getAttribute('dataset') //Pega o atribulado de click
                        var url = API_URL + poke_id
        
                        pokeAPI.getPokemon(poke_id) //GET_POKEMON
                            .then((response) => {
                                poketest.pop()
                                poketest.push(response)
                            }) //Retorna o pokemon
        
        
        
        
                    })
                });*/

    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    console.log(offset);
    loadPokemonItens(offset, limit)
})

function scroll() {
    if (window.scrollY + window.innerHeight >= (document.documentElement.scrollHeight) - 100) {
        offset += limit
        loadPokemonItens(offset, limit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
}

window.addEventListener('scroll', scroll)

