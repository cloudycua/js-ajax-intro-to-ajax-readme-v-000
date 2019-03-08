function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function showRepositories() {
  // this is set to the XMLHttpRequest object that fired the event
  // tell the interpreter that we're working with JSON by parsing it with JSON.parse
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
  // We can see that we can make another GET request to /repos/:owner/:repo/commits and list the commits.
  // Need an element to click for each repository on our page that will request that repository's commits. So we'll need to add a "Get Commits" link to our output in showRepositories, make a new XHR request when that link is clicked, and then show the commits in the second column.
  // add link to repository output
  // onclick is explicitly passing this to the getCommits function. We need to do this to make sure that the current element, that is, the link being clicked, is available to our getCommits function so that we can get at that data attribute later.
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}


// Here we grab that data-repo value through the dataset property, then set up an XHR request, with an event listener and callback function, just like we did in getRepositories.
function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('commits').innerHTML = commitsList;
}