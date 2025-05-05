const fs = require('fs');
const path = require('path');

const moviesFilePath = path.join(__dirname, 'data', 'movies.json');

let moviesData = []

try {
    const rawData = fs.readFileSync(moviesFilePath, 'utf-8');
    moviesData = JSON.parse(rawData);
    console.log("Number of movies loaded:", moviesData.length);
} catch (err) {
    console.error("Error reading or parsing movies.json", err)
}

console.log(moviesData);

const resolvers = {
    Query: {
      getMovie: (_, { id }) => {
        console.log(`Searching for movie with ID: ${id}`); 
        const movie = moviesData.find(movie => movie.id === id);
        console.log(`Found movie: ${movie ? movie.title : 'None'}`); 
        return movie;
      },
      getAllMovieIds: () => {
        return moviesData.map(movie => movie.id);
      }
    },
 
};
  
module.exports = resolvers;
