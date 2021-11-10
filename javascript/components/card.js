
export default function displayCards(movies) {
  const content = document.querySelector('#Content');
  if (movies.length===0) return content.innerHTML = 'No hay pelis'
  let cards = '';
  movies.forEach(movie => {
    const year = !movie.Year.match(/^N\s*[/]\s*A$/) ? `<span class="cm-card-year">Year: <strong>${movie.Year}</strong></span>` : ''
    const rating = !movie.imdbRating.match(/^N\s*[/]\s*A$/) ? `<span class="cm-card-rating">Rating: <strong>${movie.imdbRating}</strong></span>` : ''
    const image = !movie.Poster.match(/^N\s*[/]\s*A$/) ? `<div class="cm-card-image"><img src="${movie.Poster}"></div>` : ''
    cards += `
    <article class="cm-card">
      <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="cm-card-link">
        ${movie.Title}
        ${year}
        ${rating}
        ${image}
      </a>
    </article>`;
  });
  return content.innerHTML = cards;
}
