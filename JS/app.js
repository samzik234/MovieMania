const getMovies = async () => {
  const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=83a797d99c1fa3be5726cb64e8f3935a');
  const result = await response.json();
  console.log(result);

  const movieContainer = document.querySelector('.movie'); // Select the container to hold movie items

  result.results.forEach(movie => {
    const movie_item = document.createElement('div');
    movie_item.classList.add('movie_item'); // Add class for styling

    // Create and append poster image
    const posterImg = document.createElement('img');
    posterImg.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    movie_item.appendChild(posterImg);

    // Create and append title
    const title = document.createElement('h3');
    title.textContent = movie.title;
    movie_item.appendChild(title);

    // Create and append overview
    const overview = document.createElement('p');
    overview.textContent = movie.overview;
    movie_item.appendChild(overview);

    // Create and append popularity
    const moviePopularity = document.createElement("p");
    moviePopularity.textContent = `Popularity: ${movie.popularity}`;
    movie_item.appendChild(moviePopularity);

    // Create the "Add to Watchlist" button
    const addWatchList = document.createElement('button');
    addWatchList.textContent = "Add to Watchlist";
    addWatchList.style.width = '120px';
    addWatchList.style.height = '40px';
    addWatchList.style.margin = '10px auto';

    // Add event listener to store the movie in the watchlist
    addWatchList.addEventListener('click', () => {
      addToWatchlist(movie);  // Call function to add movie to watchlist
    });

    movie_item.appendChild(addWatchList);  // Append the button to the movie item
    movieContainer.appendChild(movie_item);  // Append each movie item to the container
  });

  // Fixing the Hamburger Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const mobile_menu = document.querySelector('.mobile-nav');
  

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('is-active');
  mobile_menu.classList.toggle('is-active');

});

};



// Function to add the movie to the watchlist
function addToWatchlist(movie) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []; // Get current watchlist from localStorage
  watchlist.push(movie);  // Add the movie to the watchlist
  localStorage.setItem('watchlist', JSON.stringify(watchlist));  // Save the updated watchlist to localStorage
  alert(`${movie.title} has been added to your watchlist!`);  // 
}


getMovies();



// Function to fetch and display movies based on search query
async function searchMovies(query) {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=83a797d99c1fa3be5726cb64e8f3935a&query=${query}`);
  const result = await response.json();
  displayMovies(result.results);
}

// Function to display movies in the grid
function displayMovies(movies) {
  const movieGrid = document.getElementById('movies-grid');
  movieGrid.innerHTML = ''; // Clear previous movies
  

  if (movies.length === 0) {
    movieGrid.innerHTML = '<p>No movies found!</p>'; // Display message if no movies found
    return;
  }

  movies.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    movieItem.style.margin="auto"

    movieItem.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Rating: ${movie.vote_average}</p>
      <p>${movie.overview}</p>
    `;
    const img = movieItem.querySelector('img');
    img.style.width = '50%'; 
    img.style.margin='auto' 
    
    movieItem.style.width='50%'
    movieItem.style.margin= 'auto'
    movieItem.style.height= '50%'
    
    movieGrid.appendChild(movieItem); 
  });
}

// Add event listener to the search button
document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-input').value;
  if (query) {
    searchMovies(query); // Call the search function with the user's input
  } else {
    alert('Please enter a movie title.'); // Alert if input is empty
  }
});



const API_KEY = '83a797d99c1fa3be5726cb64e8f3935a'; // Replace with your actual API key

// Listen for input in the search bar
document.getElementById('search-input').addEventListener('input', function() {
  const query = this.value;
  if (query.length > 2) {
    fetchSearchSuggestions(query); // Fetch suggestions if query length > 2
  } else {
    document.getElementById('suggestions-container').innerHTML = ''; // Clear suggestions if query is too short
  }
});


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


