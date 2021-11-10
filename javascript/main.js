import card from './components/card.js'

var moviesArrayMemory = [];
const formElement = document.querySelector ('#myForm');

formElement.addEventListener('submit', evt => {
  evt.preventDefault();
  let movieTitle = document.querySelector('#NameMovie').value;
  search(movieTitle);
});

function showFilters(value) {
  let filters = document.querySelector('#Filters');
  if (!value && filters.className === 'cm-show') {
    filters.className = 'cm-hide';
  } else if (value && filters.className === 'cm-hide') {
    filters.className = 'cm-show';
  }
}

function getMovieForImdb(id) {
  return fetch('http://www.omdbapi.com/?apikey=422350ff&i=' + id)
  .then(res => res.json())
  .catch((error) => {
    console.log('Error getMoviesForImdb:', error);
  })
}

function search(movieTitle) {
  showFilters(false);
  fetch('http://www.omdbapi.com/?apikey=422350ff&s=' + movieTitle)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    return data.Search;
  })
  .then(search => {
    console.log(search);
    if (search.length===0) {
      moviesArrayMemory = [];
      return moviesArrayMemory;
    } else {
      return Promise.all(search.map(movie => getMovieForImdb(movie.imdbID)));
    }
  })

  .then(result => {
    moviesArrayMemory = result.slice();
    if (moviesArrayMemory.length > 1) {
      orderArray(moviesArrayMemory);
      showFilters(true);
    } else {
      showFilters(false);
      card(moviesArrayMemory);
    }
   })
  .catch((error) => {
    console.log('Error2:', error);
    card(moviesArrayMemory);
  })
}

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    let elementA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    let elementB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
    let comparison = 0;
    if (elementA > elementB) {
      comparison = 1;
    } else if (elementA < elementB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

function orderArray(moviesArrayMemory) {
  let type = document.querySelector('#OrderType');
  let position = document.querySelector('#OrderPosition');
  moviesArrayMemory.sort(compareValues((type.options[type.selectedIndex].value), position.options[position.selectedIndex].value));
  card(moviesArrayMemory);
}
