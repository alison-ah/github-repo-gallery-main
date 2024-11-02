//The "overview" is where your profile information will appear.
const overview = document.querySelector(".overview");

const username = "alison-ah";

const reposList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");


const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
};

gitUserInfo();

const displayUserInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> 
  `;
  overview.append(div);
  gitUserRepos();
};

const gitUserRepos = async function () {
    const userRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await userRepos.json();
    displayRepos(repos);
};

const displayRepos = function (repos) {
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      reposList.append(repoItem);
    }
  };

reposList.addEventListener("click", function (e) {
if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
}
});
  
const getRepoInfo = async function (repoName) {
    const getInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getInfo.json();
    console.log(repoInfo);
    //identify the languages used
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displayDescription(repoInfo, languages);
};

const displayDescription = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.username}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a> 
  `;
  repoData.append(div);
};