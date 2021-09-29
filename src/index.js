const API_KEY = '00462ab2-489a-4db5-b0c0-bd6fc40fc753';
const API_URL_Search =
  'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1`;

getMovies(API_URL);

async function getMovies(url) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const responseData = await response.json();
  showMovies(responseData);
}

function showMovies(data) {
  const containerMovies = document.querySelector('.movies .list');

  containerMovies.innerHTML = '';

  data.films.forEach(movie => {
    const li = document.createElement('li');
    li.classList.add('itemMovies');
    li.innerHTML = `
      <div key="${movie.filmId}" class="movie__div">
        <div class="container__image">
          <img
            src="${movie.posterUrlPreview}"
            alt="${movie.nameRu}"
            value="${movie.filmId}"
            with="100"
            class="movie__image"
          />
        </div>
        <div class="movie__info">
          <h6 class="movie__title">${movie.nameRu}</h6>
          <p class="movie__category">${movie.year}, ${movie.genres.map(genre => genre.genre)}</p>
          <p class="movie__rating rating--${addClassRating(movie.rating)}">${movie.rating}</p>
        </div>
      </div>
    `;
    containerMovies.appendChild(li);
  });
}

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.querySelector('.form-control');
  const apisearch = `${API_URL_Search}${input.value}`;

  if (input.value) {
    getMovies(apisearch);
    input.value = '';
  }
});
function addClassRating(vote) {
  if (vote >= 7) {
    return 'green';
  } else if (vote > 5) {
    return 'orange';
  } else {
    return 'red';
  }
}
