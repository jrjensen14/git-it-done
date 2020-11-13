// Request & Capture Data:
// var getUserRepos = function() {
//     // console.log("function was called");
//      var response = fetch("http://api.github.com/users/octocat/repos").then(function(response) {
//         //  console.log("inside", response);
//         response.json().then(function(data) {
//             console.log(data);
//         })
//      });
//     //  console.log("outside");
// };
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "http://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
            // console.log(data);
            displayRepos(data, user);
        });
    });
};
// getUserRepos();

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var fromSubmitHandler = function(event) {
    event.preventDefault();
    // console.log(event);
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
}

var displayRepos = function(repos, searchTerm) {
    // console.log(repos);
    // console.log(searchTerm);
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repos
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);
        
        // append container to the DOM
        repoContainerEl.appendChild(repoEl);
    }
}


userFormEl.addEventListener("submit", fromSubmitHandler);
