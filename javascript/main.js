var cards = "";
function traerImbId (id) {
  //console.log (id);
  fetch('http://www.omdbapi.com/?apikey=422350ff&i=' + id)
  .then(res2 => res2.json())
  .then(data2 => {
    pepe = data2.imdbRating
    console.log ('rating: ' + pepe)
    return pepe
  })
  .catch((error2) => {
    console.error('Error:', error2);
  })
}

function traer() {
  fetch('http://www.omdbapi.com/?apikey=422350ff&s=batman')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    // console.log(data.Search['0'].Year)
    for (var i = 0; i < data.Search.length; i++) {
      var pepa = traerImbId(data.Search[i].imdbID);
      console.log (pepa);
      cards += `
<div class="card">
  <p>Title: ${data.Search[i].Title}</p>
  <p>Year: ${data.Search[i].Year}</p>
  <p>ID: ${data.Search[i].imdbID}</p>
  <img src="${data.Search[i].Poster}">
</div>
`;
    }
    // console.log (cards);
    var contenido = document.querySelector('#contenido');
    contenido.innerHTML = cards;
  })
  .catch((error) => {
    console.error('Error:', error);
  })
}


// tt0372784
// imdbID
// imdbRating
