// this is working
// fetch("http://www.omdbapi.com/?apikey=thewdb&s=kill")
// .then(res => res.json())
// .then(data => data.Search)
// .then(search => search.map((search)=>console.log(search)));

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

//form EventListener
searchForm.addEventListener("submit", (e)=>{
    // get the search term
    const searchTerm = searchInput.value;
    // get the sorting from thr radio buttons
    const sortBy = document.querySelector("input[name='sortby']:checked").value;
    // get the limit from the drop down
    const limit = document.querySelector("#limit").value;

    if(searchTerm === ""){
        showMessage("please search for something", "alert-danger");
    }
    searchTerm.value = "";
    //search Reddit
    search(searchTerm);


    e.preventDefault();
});


// alet user
function showMessage(message, className){
    // create div
    const div = document.createElement("div");
    // add class
    div.className = 'alert '+ className;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent container
    const parent = document.querySelector("#search-container");
    parent.insertBefore(div, document.querySelector("#search"));
    //timeout alert in 2 seconds
    setTimeout(()=>{
        document.querySelector(".alert").remove();
    }, 2000);
}

// fetch data from redditApi
function search(search){
        fetch("http://www.omdbapi.com/?apikey=thewdb&s="+search)
        .then(res => res.json())
        .then(data => data.Search)
        .then(results => {
            console.log(results);
            let output = "<div class='card-columns'>";
            // loop start off here!
            results.forEach((movie) => {
                console.log(movie);
                let img = movie.Poster ? movie.Poster : "http://postmediaottawacitizen2.files.wordpress.com/2014/06/politifact-photos-reddit.jpg"

                output+=`
                    <div class='card'>
                        <img class='card-img-top mb-3 border border-dark' src='${movie.Poster}' alt='Card image cap'>
                        <div class='card-block'>
                            <h4 class='card-title ml-2'>${movie.Title}</h4>
                            <p class='card-text ml-2'>
                                <span class="badge badge-dark">${movie.Year}</span>
                                <span class="badge badge-info">${movie.Type}</span>
                                </p>
                            <a href='https://www.google.com/search?q=${movie.Title}' target="_blank" class='btn btn-primary ml-2'>Read More</a>
                            <hr>
                                <span class="badge badge-secondary">Subreddit: </span>
                                <span class="badge badge-dark">Score: </span>
                            </hr>
                        </div>
                    </div>
                `
            })

        output+="</div>";
        document.querySelector("#results").innerHTML = output;
    }).catch(error => showMessage("movie Not found ", "alert-warning"));
}

// Truncate Text
function truncate(text, numOfChar){
    const shortend = text.indexOf(" ", numOfChar);
    return shortend === -1? text : text.substring(0, shortend);
}
