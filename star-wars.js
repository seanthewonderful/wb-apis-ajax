import axios from "axios";

const episodeNum = Math.ceil(Math.random() * 6); // random number 1-6

axios
  .get(`https://swapi.dev/api/films/${episodeNum}`)
  // .then -> once the preceding operation is complete, run my callback
  .then((res) => {
    console.log(res.data);
    document.querySelector("#star-wars-movie").innerText = res.data.title;
  });

console.log("this will be logged first");
