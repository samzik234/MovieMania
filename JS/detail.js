const API_KEY = '83a797d99c1fa3be5726cb64e8f3935a';  // Your actual TMDB API key

// Function to fetch and display movie details
async function getMovieDetails(movieId) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,images,credits`);
    const movie = await response.json();
    
    console.log("Movie Data:", movie); // Log the movie data for debugging
    displayMovieDetails(movie); // Call the function to display movie details
  } catch (error) {
    console.error("Error fetching movie details:", error); // Log any errors
  }
}

// Function to display detailed movie information
function displayMovieDetails(movie) {
  const movieDetailsContainer = document.getElementById('movie-details');

  movieDetailsContainer.innerHTML = `
    <h2>${movie.title}</h2>
    <p><strong>Release Date:</strong> ${movie.release_date}</p>
    <p><strong>Rating:</strong> ${movie.vote_average}</p>
    <p><strong>Overview:</strong> ${movie.overview}</p>
    <p><strong>Genres:</strong> ${movie.genres.map(genre => genre.name).join(', ')}</p>
    <p><strong>Cast:</strong> ${movie.credits.cast.slice(0, 5).map(cast => cast.name).join(', ')}</p>
    <p><strong>Director:</strong> ${movie.credits.crew.find(crew => crew.job === 'Director')?.name || 'Unknown'}</p>
    <div>
      <h3>Trailer:</h3>
      ${getTrailer(movie.videos.results)} <!-- Embed the movie trailer -->
    </div>
  `;
}

// Function to get and embed trailer
function getTrailer(videos) {
  const trailer = videos.find(video => video.type === 'Trailer');
  if (trailer) {
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>`;
  }
  return '<p>No trailer available.</p>';
}

// // Example usage
 const movieId = '278'; // Replace with the actual movie ID you want to fetch
 
getMovieDetails(movieId);
