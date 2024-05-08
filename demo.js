import axios from 'axios'

const queryString = new URLSearchParams({ offset: 200, limit: 10}).toString();

const url = `https://pokeapi.co/api/v2/pokemon?${queryString}`;

const res = await axios.get(url)

console.log(res.data)