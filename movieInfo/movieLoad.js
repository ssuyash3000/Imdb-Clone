
var movieApp = (function (){
    let movieId = JSON.parse(localStorage.getItem("movieId"));
    console.log(movieId + "HELLO");
    let movieDetails = null;
    let titleEle = document.getElementById("title");
    let imgEle = document.getElementsByTagName("img")[0];
    let yearEle = document.getElementById("year");
    let ratingEle = document.getElementById("rating")
    let releaseEle = document.getElementById("release-data");
    let runTimeEle = document.getElementById("run-time");
    let genereEle = document.getElementById("genre");
    let directorEle = document.getElementById("director");
    let writerEle = document.getElementById("writer");
    let castEle = document.getElementById("cast");
    async function fetchMovieDetails(id){
        
        const response = await fetch(`https://omdbapi.com/?apikey=f5d4d0a6&i=${id}`);
        movieDetails = await response.json();
        console.log(movieDetails);
        titleEle.innerHTML += `<h2>${movieDetails.Title}</h2>`;
        imgEle.setAttribute("src", movieDetails.Poster);
        yearEle.innerHTML += `<h2>${movieDetails.Year}<h2>`;
       
        releaseEle.innerHTML += `<h2>${movieDetails.Released}<h2>`;
        genereEle.innerHTML += `<h2>${movieDetails.Genre}<h2>`;
        runTimeEle.innerHTML += `<h2>${movieDetails.Runtime}</h2>`;
        castEle.innerHTML += `<h2>${movieDetails.Actors}</h2>`;
        directorEle.innerHTML += `<h2>${movieDetails.Director}</h2>`;
        writerEle.innerHTML += `<h2>${movieDetails.Writer}</h2>`;
         ratingEle.innerHTML += `
         
         <h2>Source : ${movieDetails.Ratings[1].Source}<h2>
         <h2>Rating : ${movieDetails.Ratings[1].Value}<h2>
         
         `

    }
    
    function movieLoad(){
        
        fetchMovieDetails(movieId);
        
    }
    movieLoad();
})()