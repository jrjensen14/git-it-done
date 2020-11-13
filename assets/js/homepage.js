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
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
            // console.log(data);
            displayRepos(data, user);
        });
    } else {
        alert("Error: " + response.statusText);
    }
    })
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connecto to GitHub");
    })
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
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
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
        
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check of current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "i class='fas fa-times status-icon-danger;></i>" + repos[i].open_issues_count + "issue(s)";
        } else {
            statusEl.innerHTML = "<i class= 'fas fa-check-spuare-icon icon-success'></i>";
        }

        // append container to the DOM
        repoContainerEl.appendChild(repoEl);
    }
}


userFormEl.addEventListener("submit", fromSubmitHandler);
