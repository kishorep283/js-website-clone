/* curosole container */
const speakers = [
  {
    id: 1,
    imageSrc: "API PICTURES/biryani/b-1.jpg",
    content:"Biryani",
    link:"food.html?item=biryani"
  },
  {
    id: 2,
    imageSrc: "API PICTURES/Burgers/bb-1.jpg",
    content:"Burger",
    link:"food.html?item=burgers"
  },
  {
    id: 3,
    imageSrc: "API PICTURES/pizzas/p-1.jpg",
    content:"Pizza",
    link:"food.html?item=pizza"
  },
  {
    id: 4,
    imageSrc: "API PICTURES/cakes/cak-1.jpeg",
    content:"Cakes",
    link:"food.html?item=cakes"
  },
  {
    id: 5,
    imageSrc: "API PICTURES/noodles/n-1.webp",
    content:"Noodles",
    link:"food.html?item=noodles"
  },
  {
    id: 6,
    imageSrc: "API PICTURES/Tiffins/dosa-1.jpg",
    content:"Tiffins",
    link:"food.html?item=tiffins"
  },
];
const speakersContainer = document.getElementById("speakersSlider");
const selectedSpeakerSection = document.getElementById("selectedSpeaker");
  
  // Create speaker cards
  speakers.forEach(speaker => {
    const card = document.createElement("div");
    card.classList.add("speaker-card");
    card.innerHTML = `
          <a href="${speaker.link}"><img src="${speaker.imageSrc}" alt="${speaker.name}"></a>
          <h2>${speaker.content}</h2>
  
      `;
      speakersContainer.appendChild(card);
  });
  const speakersSlider = document.querySelector(".speakers-slider");
  
  // Get the body element for calculating the width
  const sliderWidth = parseFloat(getComputedStyle(speakersSlider).width);
  const firstCard = document.querySelector(".speaker-card");
  
  // Ensure that the first card exists before calculating
  if (firstCard) {
    const cardStyle = getComputedStyle(firstCard);
    const cardWidth = parseFloat(cardStyle.width);
    const cardMarginLeft = parseFloat(cardStyle.marginLeft);
    const cardMarginRight = parseFloat(cardStyle.marginRight);
    const cardWidthWithMargins = cardWidth + cardMarginLeft + cardMarginRight;
    const cardsPerView = Math.floor(sliderWidth / cardWidthWithMargins);
  
    document
      .querySelector(".carousel-control.left")
      .addEventListener("click", () => {
        speakersSlider.scrollBy({
          left: -cardWidthWithMargins * cardsPerView,
          behavior: "smooth"
        });
      });
  
    document
      .querySelector(".carousel-control.right")
      .addEventListener("click", () => {
        speakersSlider.scrollBy({
          left: cardWidthWithMargins * cardsPerView,
          behavior: "smooth"
        });
      });
  }

/* Items Container */


/* Navbar menu */

let menubar = document.getElementById("menu-list");
menubar.style.height = "0px";
function toggleMenu(){
    if(menubar.style.height == "0px"){
        menubar.style.height ="400px";
    }
    else{
        menubar.style.height="0px";
    }
}



/* End Of Navbar */


/* Restaurents Container */
let online=document.querySelector(".online-food");
let delivery=document.querySelector(".delivery");
let ratings=document.querySelector(".ratings");
let th300=document.querySelector(".th300");
let f400=document.querySelector(".f400");
let inp = document.querySelector(".inp");

delivery.addEventListener("click",()=>{
  let data=JSON.parse(localStorage.getItem("data")) || [];
  if(data.length ==0){
    console.log("No data available");
  }
  else{
    let result =data.filter(ele => ele.time < 30);
    displaydata(result);
    console.log(result);
  }
})

ratings.addEventListener("click",()=>{
  let data =JSON.parse(localStorage.getItem("data"))||[]
  if(data.length == 0){
    console.log("no data available");
  }
  else{
    let result =data.filter(ele => ele.rating >= 4);
    displaydata(result);
  }
})

th300.addEventListener("click",()=>{
  let data =JSON.parse(localStorage.getItem("data")) || []
  if(data.length == 0){
    console.log("No Data available");
  }
  else{
    let result = data.filter(ele => ele.price <= 300);
    displaydata(result);
  }
})

f400.addEventListener("click",()=>{
  let data =JSON.parse(localStorage.getItem("data")) || []
  if(data.length == 0){
    console.log("No Data available");
  }
  else{
    let result = data.filter(ele => ele.price > 300);
    displaydata(result);
  }
})

inp.addEventListener("input" , (event)=>{
  let data =JSON.parse(localStorage.getItem("data")) || []
  if(data.length == 0){
    console.log("No Data available");
  }
  else{
    let searchvalue =event.target.value.toLowerCase();
    let result = data.filter(ele => ele.type.toLowerCase().includes(searchvalue) || ele.name.toLowerCase().includes(searchvalue));
    console.log(result);
    displaydata(result);
  }
})

async function getdata(){
let res = await fetch("http://localhost:3000/cart");
let data = await res.json();
localStorage.setItem("data",JSON.stringify(data));
displaydata(data);
}
function displaydata(data){
  let htmlpage="";
    if(data.length == 0){
      console.log("no data available");
    }
    else{
      data.forEach(ele => {
          htmlpage = htmlpage +
          `
          <div class="sub">
          <a href="restaurant.html?id=${ele.id}"><img class="image" src=${ele.image}></a>
            <span class="title">${ele.name}</span><br>
            <span><i class="fa fa-star" aria-hidden="true"></i><b>${ele.rating}</b>  ${ele.time}-mins</span><br>
            <span>${ele.type}</span><br>
            <span>${ele.city}</span><br>
            <span>AVG RS ${ele.price}</span><br>
          </div>

          `
      })
       online.innerHTML=htmlpage;
    }
  }
getdata();
