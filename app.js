const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.getElementById("search");

async function getMovies(){
    const response = await fetch(APIURL);
    const respData = await response.json();
    respData.results.forEach((movie) => {
        const movieEl = document.createElement('div');

        movieEl.innerHTML = `<div class="movie">
        <img src="${IMGPATH + movie.poster_path}" 
        alt="${movie.title}">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <span class=${getClassByRate(movie.vote_average)}>${movie.vote_average}</span>
        </div>
    </div>`

        main.appendChild(movieEl)
    })

    return respData;
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

getMovies();
