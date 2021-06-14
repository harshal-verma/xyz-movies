const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.getElementById("search");
const movieCard = document.querySelector(".movie");

getMovies(APIURL);

async function getMovies(url){
    const response = await fetch(url);
    const respData = await response.json();
      showMovies(respData.results);
}

function showMovies(movies){
    const arrLength = movies.length;
    main.innerHTML = "";
    for(let i = 0 ; i< arrLength ; i++){
        const movieEl = document.createElement('div');
        movieEl.innerHTML = `
        <div class="movie" onclick="viewMovieCard(event)">
        <img id=${i} src="${IMGPATH + movies[i].poster_path}" 
        alt="${movies[i].title}">
        <div class="movie-info">
            <h3>${movies[i].title}</h3>
            <span class=${getClassByRate(movies[i].vote_average)}>${movies[i].vote_average}</span>
            </div>
        </div>
        `  
        main.appendChild(movieEl)
    }
}

async function viewMovieCard(e){
    const response = await fetch(APIURL);
    const respData = await response.json();
    let movies = respData.results;
    console.log(movies);
    console.log(e);
    console.log(e.target.title)
    main.innerHTML = " ";
    const singleMovieEl = document.createElement("div");
    singleMovieEl.innerHTML = `
    <img src="${IMGPATH + movies[e.target.id].poster_path}" 
    alt="${movies[e.target.id].title}">
    `
    main.appendChild(singleMovieEl);
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
