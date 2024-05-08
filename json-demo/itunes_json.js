import mountainSongs from "./mountain.json" assert { type: "json" };

console.log(Object.keys(mountainSongs)); // ['resultCount', 'results']
console.log(mountainSongs["results"][0].wrapperType); // big object ...

// const firstSong = mountainSongs['results'][0];
// console.log(Object.keys(firstSong));  // 'trackName', 'artistName', etc

// // Getting a track name out of the data structure
// console.log(mountainSongs['results'][0]['trackName']);
