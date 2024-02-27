// // const API_KEY = "168771779c71f3d64106d8a88376808a";
// // let para = document.querySelector(".newpara");
// // async function callWhether(){
// //     let city = "Maharashtra";

// //     const response = await fetch(
// //         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
// //       );

// //     const data = await response.json();
// //     console.log(data.main)
// //     para.innerText = `Weather in ${city} is ${data.main.feels_like}°C`;
// // }
// // callWhether();

// const url = "https://api.github.com/users/";
// let user = document.querySelector(".userid");
// let img = document.querySelector(".img");
// let namee = document.querySelector(".namee");
// let bio = document.querySelector(".bio");
// let createdon = document.querySelector(".createdon");
// let followers = document.querySelector(".followers");
// let followings = document.querySelector(".following");

// let data ;

//   user.addEventListener('keypress',async () => {
//     if (event.key === "Enter") {
//       let userId = user.value;
//       let userurl = url+userId;
//       let response = await fetch(userurl);
//        data =await response.json();
 
//        img.backgroundImage
//        namee.innerHTML = data.name;
//        img.backgroundImage = "url('data.avatar_url')"
//        bio.innerHTML = data.bio
//        createdon.innerHTML = data.
//        followers.innerHTML = data.followers
//        followings.innerHTML = data.followings
//     }
//   })



const userTab = document.querySelector("[data-userweather]")
const searchTab = document.querySelector("[data-searchweather]")
const userContainer = document.querySelector(".weather-container")
const grantAccessContainer = document.querySelector(".grant-location-container")
const searchForm = document.querySelector("[data-searchForm]")
const loadingScreen = document.querySelector("[loading-container]")
const userInfoContainer = document.querySelector("[user-info-container]")

let currentTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c"; 
currentTab.classList.add("current-tab");

// switch tab function
function switchTab(clickedTab){

  if(currentTab != clickedTab){
    currentTab.classList.remove("current-tab")
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");

    if(!searchForm.classList.contains(".active")){
      /* if location access is not granted then show access permission wala page,
      else show user data*/
    }
  }
}

// Tab switching
userTab.addEventListener('click',() => {
  switchTab(userTab);
})

searchTab.addEventListener('click',() => {
  switchTab(searchTab);
})