
let container = document.querySelector(".users-container")

// Event Listener on Search Button

document.getElementById("search-btn").addEventListener("click", seacrhGithubUser)


// Function to Search and Populate the Data

async function seacrhGithubUser(e) {

    e.preventDefault()

    let username = document.getElementById("username").value

    let url = `https://api.github.com/users/${username}`
    const res = await fetch(url)
    const data = await res.json()

    if (data.message === "Not Found") {
        container.innerHTML = `<h1 id="error"> User Not Found </h1>`
    }
    else {
        if (data.bio === null) {
            data.bio = ""
        }
        if (data.name === null) {
            data.name = ""
        }
        container.innerHTML = `
        <div class="user">
        <div class="left">
            <img src="${data.avatar_url}"
                alt="avatar">
            <h3 id="login">${data.login}</h3>
        </div>
        <div class="right">
            <h2 id="name">${data.name}</h2>
            <p id="des">${data.bio}</p>
            <div class="boxes">
                <div class="following"><b>${data.following}</b> Following </div>
                <div class="followers"><b>${data.followers}</b> Follower </div>
            </div>
            <div class="repositories"><b>${data.public_repos}</b> Public Repository </div>   
            <a href="https://github.com/${data.login}/" target="_blank" id="visit-github">Visit Github</a>
           </div>
         </div>
        </div> 
        `
    }
    document.getElementById("username").value = ""
}


async function loadUserData() {


    const res = await fetch("https://api.github.com/users")
    const users = await res.json()

    const first4users = users.slice(0, 4)

    const userData = first4users.map((user) => {
        if (user.bio === undefined) {
            user.bio = ""
        }
        if (user.name === undefined) {
            user.name = ""
        }
        return `
        <div class="user">
        <div class="left">
            <img src="${user.avatar_url}"
                alt="avatar">
            <h3 id="login">${user.login}</h3>
        </div>
        <div class="right">
            <h2 id="name">${user.name}</h2>
            <p id="des">${user.bio}</p>
            <div class="boxes">
                <div class="following"><b>${user.following}</b> Following </div>
                <div class="followers"><b>${user.followers}</b> Follower </div>
            </div>
            <div class="repositories"><b>${user.public_repos}</b> Public Repository </div>   
            <a href="https://github.com/${user.login}/" target="_blank" id="visit-github">Visit Github Profile</a>
           </div>
         </div>
        </div> 
        `
    })
    container.innerHTML = userData.join("")
}

window.addEventListener("load", loadUserData)