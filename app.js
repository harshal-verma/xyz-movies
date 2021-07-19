APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
IMGPATH = "https://image.tmdb.org/t/p/w1280";
SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.getElementById("search");
const movieCard = document.querySelector(".movie");
const footer = document.querySelector("footer");

getMovies(APIURL);

async function getMovies(url){
    const response = await fetch(url);
    const respData = await response.json();
      showMovies(respData.results);
      singleMovieCard(respData.results);
}

function showMovies(movies){
    const arrLength = movies.length;
    main.innerHTML = "";
    for(let i = 0 ; i< arrLength ; i++){
        const movieEl = document.createElement('div');
        movieEl.innerHTML = `
        <div class="movie">
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

function singleMovieCard(movies){
main.addEventListener('click' , (e) => {
    console.log(e);
    console.log(e.target.id);
    let elementId = e.target.id;
            main.innerHTML = " ";
            footer.innerHTML = " ";
            footer.style.backgroundColor = "#373b69";
            main.style.display = 'flex';
        const singleMovieEl = document.createElement("div");
        singleMovieEl.innerHTML = `
        <div class="single-movie-div">
        <img class="single-movie-el" src="${IMGPATH + movies[elementId].poster_path}" alt="${movies[elementId].title}"/>
        <div class="single-movie-description">
            <h2 class="single-movie-title">${movies[elementId].title}</h2>
            <p class="single-movie-overview">${movies[elementId].overview}</p>
            <ul class="single-movie-ul">
                <li>Release Date:  ${movies[elementId].release_date}</li>
                <li class="color">Rating:  ${movies[elementId].vote_average}</li>
                <li><a href="index.html" class="go-back-btn">go back to home</a></li>
            </ul>
        </div>
        </div>
        `
        main.appendChild(singleMovieEl);
})};

