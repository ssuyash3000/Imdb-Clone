let favList = JSON.parse(localStorage.getItem("favList"));
console.log(favList);
let listOfMoviesInDom = document.getElementById("movieList");
function parseType(type){
    if(type === "movie"){
        return "Movie";
    }
    else if(type === "series"){
        return "TV Series";

    }else{
        return type;
    }
}
async function addMoviesToDOM(movie){
    let li = document.createElement("li");
    const response = await fetch(`https://omdbapi.com/?apikey=f5d4d0a6&i=${movie.id}`);
    movie = await response.json(); //Note - The parameter variable is getting updated here 
    let showType = parseType(movie.Type);
    li.innerHTML = 
    `
    <img src="${movie.Poster}" id = "poster"  >
    <div id="titleContainer">
    <h2 id="movieTitle"  data-id=${movie.imdbID}>${movie.Title}</h2>
    <h3 id="type">Type - ${showType}</h3>
    <span id="movieYear">${movie.Year}</span>
    </div>
    <button id="deleteBtn" 
        data-id="${movie.imdbID}" >Delete from Favourites</button>
    `
    li.setAttribute("id", `${movie.imdbID}`);
    console.log(li);
    listOfMoviesInDom.append(li);
}
function renderList(){
    listOfMoviesInDom.innerHTML="";
    for(let i = 0; i < favList.length; i++){
        addMoviesToDOM(favList[i]);
    }
}
function deleteFun(id){
    const newTasks = favList.filter(function (movie) {
        return movie.id !== id;
      });
    favList = newTasks;
    let ele = document.getElementById(id);
    ele.style.display ="none";
    //updating the favList array present in the localStorage
    localStorage.setItem("favList", JSON.stringify(favList));

}
function handleClick(e){
    const target = e.target;
    if(target.id === "movieTitle"){
        movieId = target.dataset.id;
        //console.log( JSON.stringify(movieId));
        localStorage.setItem("movieId", JSON.stringify(movieId));
        // window.location = "./movieInfo/movie.html";
        // console.log(target.tagName);
        window.open("./../movieInfo/movie.html", "_blank");

    }else if(target.id === "deleteBtn"){
        
        deleteFun(target.dataset.id);
       // renderList();
    }
}
document.addEventListener("click", handleClick);
renderList();