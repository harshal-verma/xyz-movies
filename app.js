const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.getElementById("search");

//initially get fav movies
getMovies(APIURL);

async function getMovies(url){
    const response = await fetch(url);
    const respData = await response.json();
    showMovies(respData.results);
}

function showMovies(movies){
    main.innerHTML = "";
    movies.forEach((movie) => {
        const movieEl = document.createElement('div');

        movieEl.innerHTML = `
        <div class="movie">
        <img src="${IMGPATH + movie.poster_path}" 
        alt="${movie.title}">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <span class=${getClassByRate(movie.vote_average)}>${movie.vote_average}</span>
        </div>
        </div>
        `

        main.appendChild(movieEl)
    })

}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green';
    }else if(vote >= 5){
        return 'orange';
    }else{
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);     
   
        search.value = '';
    }
});
