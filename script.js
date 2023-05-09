console.log('github wrapper');

const userNameInput = document.getElementById('userName');
const showDetailsButton = document.getElementById('showDetails');
const profileInfoDiv = document.getElementById('profileInfo');
const reposInfoDiv = document.getElementById('reposInfo');

// using async and await
showDetailsButton.addEventListener('click', async () => {
    const userName = userNameInput.value;

    //request the data from server: fetch api
    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.json();
    showProfile(data);
    showReposInfo(userName);
})

function showProfile(data) {
    // console.log(data);
    profileInfoDiv.innerHTML = `<div class="card">
        <div class="card-img">
            <img src=${data.avatar_url} alt=${data.name} id="img">
        </div>
       
        <div class="card-body">
            <div class="card-title">${data.name}</div>
            <div class="card-subHeading">${data.login}</div>
            <div class="card-text">
                <p>${data.bio}</p>
                <p>${data.followers} followers ${data.following} following</p>

                <button id="profile-btn">
                        <a href=${data.html_url}>
                            Do checkout Profile
                        </a>
                </button>
            </div>
        </div>
    </div>`


document.getElementById("img").style.borderRadius = "50%";
document.getElementById("img").style.border="3px solid #088EF8"
document.querySelector('.card-title').style.fontSize="32px";
document.getElementById('profile-btn').style.padding="5px 10px";
document.getElementById('profile-btn').style.borderRadius="10px";
document.getElementById('profile-btn').style.backgroundColor="#088EF8";
document.getElementById('profile-btn').style.color="white";
}


document.getElementById("profileInfo").style.borderRadius="10px solid #088EF8";
async function showReposInfo(userName) {
    const res = await fetch(`https://api.github.com/users/${userName}/repos`)
    const projects = await res.json();
    
    for (let i = 0; i < projects.length; i++) {
        reposInfoDiv.innerHTML += `<div class="card">
                <div class="card-body">
                    <div class="card-title">${projects[i].name}</div>
                    
                    <div class="card-feature">
                    <div class="card-subHeading">${projects[i].language}</div>
                    <div>stars:${projects[i].stargazers_count}</div>
                    <div><span>fork:${projects[i].forks}</span></div>
                    <div>${projects[i].size}Kb</div>
                    </div>
                    <div class="card-text">
                        <button>
                            <a href=${projects[i].html_url}>
                                Do checkout Project
                            </a>
                        </button>
                    </div>
                </div>
            </div>`
          
    }
    document.getElementById('profile-btn').style.padding="5px 10px";

}

/*const p=new Promise((resolve,reject)=>{
    const x=1+5;
    if(x===2){
        resolve('Success');
    }else{
        reject('Failed');
    }
})
//then will be executed when promise resolve otherwise catch will be executed
p.then((data)=>{
    console.log(data);
}).catch((err)=>console.log(err))*/