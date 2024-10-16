// Function to display the watchlist
function displayWatchlist() {
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []; // Get watchlist from localStorage
  const watchlistGrid = document.getElementById('watchlist-grid');
  watchlistGrid.innerHTML = ''; // Clear previous content

  if (watchlist.length === 0) {
    watchlistGrid.innerHTML = '<p>Your watchlist is empty!</p>'; // Display message if watchlist is empty
    return;
  }

  // Iterate over the watchlist and display each movie
  watchlist.forEach((movie, index) => {
    if (movie && movie.poster_path) { // Check if movie object is valid and has poster_path
      let movieItem = document.createElement('div');
      movieItem.classList.add('movie-item');

      movieItem.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
        <p>Rating: ${movie.vote_average}</p>
        <p>Popularity: ${movie.popularity}</p>
        <p>${movie.overview}</p>
        <button class="remove-movie" data-index="${index}">Remove</button>
        <button class="move-up" data-index="${index}">Move Up</button>
        <button class="move-down" data-index="${index}">Move Down</button>
      `;

      watchlistGrid.appendChild(movieItem); // Append each movie to the watchlist grid
    } else {
      console.error("Invalid movie object:", movie); // Log invalid movie objects
    }
  });

  // Attach event listeners for remove, move up, and move down buttons
  document.querySelectorAll('.remove-movie').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      removeFromWatchlist(index);
    });
  });

  document.querySelectorAll('.move-up').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      moveMovieUp(index);
    });
  });

  document.querySelectorAll('.move-down').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      moveMovieDown(index);
    });
  });
}

// Function to remove a movie from the watchlist
function removeFromWatchlist(index) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  watchlist.splice(index, 1); // Remove the movie at the specified index
  localStorage.setItem('watchlist', JSON.stringify(watchlist)); // Update the localStorage
  displayWatchlist(); // Refresh the watchlist display
}

// Function to move a movie up in the watchlist
function moveMovieUp(index) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  index = parseInt(index); // Convert index to number
  if (index > 0) { // Ensure it's not the first item
    [watchlist[index - 1], watchlist[index]] = [watchlist[index], watchlist[index - 1]]; // Swap items
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    displayWatchlist(); // Refresh the watchlist display
  }
}

// Function to move a movie down in the watchlist
function moveMovieDown(index) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  index = parseInt(index); // Convert index to number
  if (index < watchlist.length - 1) { // Ensure it's not the last item
    [watchlist[index], watchlist[index + 1]] = [watchlist[index + 1], watchlist[index]]; // Swap items
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    displayWatchlist(); // Refresh the watchlist display
  }
}

// Call the function to display the watchlist when the page loads
displayWatchlist();


