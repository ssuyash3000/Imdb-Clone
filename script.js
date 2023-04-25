
var app = (function(){
    let inputBar = document.getElementById("movieSearch");
    let listOfMoviesInDom = document.getElementById("movieList");
    let errorMessage =  document.getElementById("errorMessage");

    let movieList = [];
    let favList = [];
    let movieId = null;
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
    function addMoviesToDOM(movie){
        let li = document.createElement("li");
        let showType = parseType(movie.Type);
        li.innerHTML = 
        `
        <img src="${movie.Poster}" id = "poster"  >
        <div id="titleContainer">
        <h2 id="movieTitle"  data-id=${movie.imdbID}>${movie.Title}</h2>
        </div>
        <h3 id="type">Type - ${showType}</h3>
        <span id="movieYear">${movie.Year}</span>
        <button id="favBtn" 
        data-id="${movie.imdbID}" >Add to Favourites</button>`
        listOfMoviesInDom.append(li);
    }
    function addToFav(target){
        movieObj = {
            id: target.dataset.id,
            title: target.dataset.title,
            posterUrl: target.dataset.Poster,
            year: target.dataset.year,
            showType: target.dataset.showType
        }
        for(i of favList){
            if(i.id===movieObj.id){
                errorMessage.innerHTML = "This movie is already in the Fav List";
                setTimeout(()=>{
                    errorMessage.innerHTML = "";
                }, 4000);
                window.scrollTo(0, 0);
                return;
            }
        }
        favList.push(movieObj);
        //updating the favList array in the localStorage each time 
        // favList is updated 
        localStorage.setItem("favList", JSON.stringify(favList));
    }
    function renderList(){
        for(let i = 0; i < movieList.length; i++){
            addMoviesToDOM(movieList[i]);
        }
    }
    async function searchTheTitle(title){
        console.log(title);
        const response = await fetch(`https://omdbapi.com/?apikey=f5d4d0a6&s=${title}`);
        const data = await response.json();
        console.log(data);
        if(data.Response === 'True'){
            errorMessage.innerHTML="";
            movieList = data.Search;
            listOfMoviesInDom.innerHTML = "";
            renderList();
        }
        else{
            errorMessage.innerHTML =  
            `
            <p id="errorMessage">
            
                ${data.Error}

            </p>
            `;
            setTimeout(()=>{
                errorMessage.innerHTML = "";
            }, 4000);
        }
    }
    function handleKeys(e){
        const text = inputBar.value;
        if(text.length !== 0){
            searchTheTitle(text);
        }
    }
    function handleClick(e){
        const target = e.target;
        if(target.id === "search"){
            const text = inputBar.value;
            if(text.length !== 0){
            searchTheTitle(text);
            }else{
                alert("Movie Name can not be empty")
            }
        }
        else if(target.id === "clear"){
            movieList.length = 0;
            listOfMoviesInDom.innerHTML = "";
            errorMessage.innerHTML = "";
            inputBar.value ="";
        }else if(target.id === "movieTitle"){
            movieId = target.dataset.id;
            //console.log( JSON.stringify(movieId));
            localStorage.setItem("movieId", JSON.stringify(movieId));
            // window.location = "./movieInfo/movie.html";
            window.open("./movieInfo/movie.html", "_blank");

        }else if(target.id === "favBtn"){
            addToFav(target);
        }else if(target.id === "favourite"){
            //console.log(JSON.parse(JSON.stringify(favList)));
            
            localStorage.setItem("favList", JSON.stringify(favList));
            // window.location.replace("./Favourite/favourite.html");
            window.open("./Favourite/favourite.html", "_blank")
        }
    }
    function appInitialize(){
        document.addEventListener("click", handleClick);
        document.addEventListener("keyup", handleKeys);
    }
    return {
        start: appInitialize,
        movieId:movieId,
        favList:favList,
    }
})();