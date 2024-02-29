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
const grantAccessBtn = document.querySelector(".btn1");
const searchForm = document.querySelector(".search-form")
const searchInput = document.querySelector("[data-searchInput]")
const searchBtn = document.querySelector(".btn2")
const loadingScreen = document.querySelector(".loading-container")
const userInfoContainer = document.querySelector(".user-info-container")
const parameterContainer = document.querySelector(".parameter-container")
const Windspeed = document.querySelector(".Windspeed")
const humidity = document.querySelector(".humidity")
const cloudspeed = document.querySelector(".cloudspeed")
const weather_descri = document.querySelector("[data-weatherDesc]")
const data_weatherIcon = document.querySelector("[data-weatherIcon]")
const city = document.querySelector("[data-cityName]")
const temp = document.querySelector("[data-temp]")
const data_countryIcon = document.querySelector("[data-countryIcon]")
const errormsg = document.querySelector(".error")

let currentTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c"; 
currentTab.classList.add("current-tab");

// Tab switching
userTab.addEventListener('click',() => {
  switchTab(userTab);
})

searchTab.addEventListener('click',() => {
  switchTab(searchTab);
})

// switch tab function
function switchTab(clickedTab){

  errormsg.classList.add("unactive")

  if(currentTab !== clickedTab){

    userInfoContainer.classList.add("unactive");
    parameterContainer.classList.add("unactive");
    
    //change tab ka background
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");

    if(searchForm.classList.contains("unactive")){

      searchForm.classList.remove("unactive")
      searchInput.classList.remove("unactive")
      searchBtn.classList.remove("unactive")

      grantAccessContainer.classList.add("unactive")
      userInfoContainer.classList.add("unactive")
    }else{

      grantAccessContainer.classList.remove("unactive")
      searchForm.classList.add("unactive")
      searchInput.classList.add("unactive")
      searchBtn.classList.add("unactive")
  
      /* if location access is not granted then show access permission wala page,
        else show user data*/
  
        getfromsessionstorage();

    }
  }
}

// Check if coordinates are already present in session storage or not
function getfromsessionstorage(){
  const localCoord1= sessionStorage.getItem("lat");
  const localCoord2 = sessionStorage.getItem("lon");
  if(!localCoord1){
    // agar local cord is not available, then show grant access wall page
    grantAccessContainer.classList.remove("unactive")

  }else{
    //  const coordinates = JSON.parse(localCoord);
    // const {lat,lon} = coordinates;

    const weatherData = getWeatherData(localCoord1, localCoord2);
    
    updateWeatherData(weatherData);
  }
}

// getting location of user 
grantAccessBtn.addEventListener('click', () => {

  errormsg.classList.add("unactive")

  // if loaction access is available
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position);
  }
})

// get location of search place
searchInput.addEventListener('keypress',()=>{

  errormsg.classList.add("unactive")

  if (event.key === "Enter"){
    let city = searchInput.value;
    getSearchWeatherData(city);
  }
})

function position(p){

    const lat = p.coords.latitude;
    const lon = p.coords.longitude;

    console.log(lat, " ", lon)
    // Save data to sessionStorage
    sessionStorage.setItem("lat", lat);
    sessionStorage.setItem("lon", lon);

    getWeatherData(lat,lon);
    
    
}

// collecting weather data from lat and lon
async function getWeatherData(lat, lon){

  grantAccessContainer.classList.add("unactive")
  loadingScreen.classList.remove("unactive")

  try{
        let response =await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        let data = await response.json();
        loadingScreen.classList.add("unactive")

        userInfoContainer.classList.remove("unactive");
        parameterContainer.classList.remove("unactive");
        updateWeatherData(data);
  }catch(e){
        /* if error come then 1.remove loading gif
                              2. add error 404 page*/
        loadingScreen.classList.add("unactive")

        userInfoContainer.classList.add("unactive");
        parameterContainer.classList.add("unactive");
        
        errormsg.classList.remove("unactive")
  }
}

// updating weather data
function updateWeatherData(data){
  let iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  let flagurl = "http://openweathermap.org/images/flags/" + (data.sys.country).toLowerCase() +".png";

  Windspeed.textContent = data.wind.speed+'m/s';
  humidity.textContent = data.main.humidity+'%';
  cloudspeed.textContent = data.clouds.all+'%';
  weather_descri.textContent = data.weather[0].description;
  city.textContent = data.name;
  temp.textContent = data.main.temp+"°C";
  data_weatherIcon.src = iconurl;
  data_countryIcon.src = flagurl;
}

// get location of searched city

async function getSearchWeatherData(curr_city){
  
  loadingScreen.classList.remove("unactive")
  try{

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${curr_city}&appid=${API_KEY}&units=metric`);
    let data = await response.json();
    loadingScreen.classList.add("unactive")

    if(data.message === "city not found"){
      userInfoContainer.classList.add("unactive");
      parameterContainer.classList.add("unactive");

      errormsg.classList.remove("unactive")
      document.querySelector(".error_msg").textContent = "City not found";

    }else{
      userInfoContainer.classList.remove("unactive");
      parameterContainer.classList.remove("unactive");
      updateWeatherData(data);
    }

  }catch(e){
        /* if error come then 1.remove loading gif
                              2. add error 404 page*/
        loadingScreen.classList.add("unactive")

        userInfoContainer.classList.add("unactive");
        parameterContainer.classList.add("unactive");

        errormsg.classList.remove("unactive")
  }
  
}


