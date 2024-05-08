/////  APIs, AJAX, and AXIOS  /////

//   APIs
// How does the data get sent to us?
// Everyone has their own data to send, but we want to standardize it so we know roughly what to expect

//   JSON (1)

//   JSON (2)

//   Using APIs (1)

//   Using APIs (2)

//   REST

//   Inspecting API Output (1 + 2)
// https://pokeapi.co/
// copy query into browser - install JSON viewer

// https://www.postman.com/downloads/  - Don't use web client, DL desktop agent

//   Inspecting API Output (3)
//  curl "https://pokeapi.co/api/v2/pokemon/ditto"
//    = TMI
//  curl "https://pokeapi.co/api/v2/pokemon/ditto" > pokeData.json
//    json extension -> format document
//  curl "https://swapi.dev/api/people" > starwars.json

//   Inspecting API Output (4)
// itunesJSON.js:
import mountainSongs from "./mountain.json" assert { type: "json" };

console.log(Object.keys(mountainSongs)); // ['resultCount', 'results']
console.log(mountainSongs["results"][0]); // big object ...

const firstSong = mountainSongs["results"][0];
console.log(Object.keys(firstSong)); // 'trackName', 'artistName', etc

// Getting a track name out of the data structure
console.log(mountainSongs["results"][0]["trackName"]);

///   AJAX  - asynchronous JS and XML

//   Why Use AJAX?

//   Making AJAX Requests in JavaScript

//   Asynchronous Code

//   Asynchronous Laundry

//   .then()

// star-wars.js:
import axios from "axios";

const episodeNum = Math.ceil(Math.random() * 6); // random number 1-6

axios.get(`https://swapi.dev/api/films/${episodeNum}`).then((res) => {
  console.log("this will be logged second");
  document.querySelector("#star-wars-movie").innerText = res.data.title;
});
console.log("this will be logged first");

/////  Sending Data with Axios  /////

//   GET Requests
// DEMO: touch pokemon.js
import axios from "axios";

function getPokemon() {
  const numPokemon = document.querySelector("#num-pokemon").value;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${numPokemon}`;

  axios.get(url).then((response) => {
    let pokemonList = "";
    for (const pokemon of response.data.results) {
      pokemonList += `<li>${pokemon.name}</li>`;
    }
    document.querySelector("#pokemon-list").innerHTML = pokemonList;
  });
}

const button = document.querySelector("#get-pokemon");
button.addEventListener("click", getPokemon);

//   Longer Query Strings
// DEMO: touch demo.py
const queryString = new URLSearchParams({ offset: 200, limit: 10 }).toString();

const url = `https://pokeapi.co/api/v2/pokemon?${queryString}`;

const res = await axios.get(url);

console.log(res.data);

//   Async/Await
// DEMO: demo.js
async function f() {
  const pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon");
  console.log(pokemon.data.results);
}

//   Top Level Await
// DEMO: demo.js
const pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon");
console.log(pokemon.data.results);

//   Full Example with Async/Await
// DEMO: pokemon-async-await.js
import axios from "axios";

async function getPokemon() {
  const numPokemon = document.querySelector("#num-pokemon").value;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${numPokemon}`;

  const response = await axios.get(url);

  let pokemonList = "";
  for (const pokemon of response.data.results) {
    pokemonList += `<li>${pokemon.name}</li>`;
  }
  document.querySelector("#pokemon-list").innerHTML = pokemonList;
}

const button = document.querySelector("#get-pokemon");
button.addEventListener("click", getPokemon);

//   POST Requests
//  We want to make our form active so users can order cookies (real cookies). We can make our own API!

//   Axios POST Request: Demo (1)
// DEMO: order-cookies.js
async function orderCookies(evt) {
  evt.preventDefault(); // prevent 'submit' event from reloading the page

  const formData = {
    cookieType: document.querySelector("#cookie-type-field").value,
    qty: document.querySelector("#qty-field").value,
  };

  const response = await axios.post("/order-cookies", formData);
  document.querySelector("#order-status").innerText = response.data.msg;
  document.querySelector("#order-total").innerText =
    "Total: $" + response.data.total.toFixed(2);
}

document.querySelector("#order-form").addEventListener("submit", orderCookies);

//   Axios POST Request: Demo (2)
// DEMO: app.js
app.post("/order-cookies", (req, res) => {
  const qty = Number(req.body.qty);
  const cookieType = req.body.cookieType;
  if (Number.isNaN(qty) || qty < 1) {
    res.json({ msg: "Invalid Order", total: 0 });
  } else {
    const unitPrice = qty > 6 ? 1.8 : 2.0;
    res.json({
      msg: `Your order of ${qty} ${cookieType} cookies is confirmed`,
      total: unitPrice * qty,
    });
  }
});

//   Axios Error Handling
