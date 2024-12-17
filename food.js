let apiendpoints ={
    tiffins:"http://localhost:3000/tiffins",
    biryani:"http://localhost:3000/biryani",
    pizza:"http://localhost:3000/pizza",
    burgers:"http://localhost:3000/burgers",
    cakes:"http://localhost:3000/cakes",
    noodles:"http://localhost:3000/noodles"
};


const urlParams = new URLSearchParams(window.location.search);
const foodItem = urlParams.get("item");

const foodContainer = document.getElementById("food-items-container");
let delivery_time=document.querySelector(".delivery-time");
let ratings_give=document.querySelector(".ratings-give");
let th300_time=document.querySelector(".th300-time");
let f400_time=document.querySelector(".f400-time");

document.getElementById("food-title").textContent = foodItem
  ? foodItem.charAt(0).toUpperCase() + foodItem.slice(1) 
  :"";
document.getElementById("food-des").textContent = foodItem ? "fill your tummy with these tasty " +foodItem.charAt(0).toUpperCase()+ foodItem.slice(1) :"";

async function newdata() {
    let res = await fetch(apiendpoints[foodItem]);
    let data =await res.json();
    localStorage.setItem("resta",JSON.stringify(data));
    display(data);
}

delivery_time.addEventListener("click",()=>{
  let data=JSON.parse(localStorage.getItem("resta")) || [];
  console.log(data);
  if(data.length ==0){
    console.log("No data available");
  }
  else{
    let result =data.filter(ele => ele.time <= 30);
    display(result);
  }
})

ratings_give.addEventListener("click",()=>{
  let data =JSON.parse(localStorage.getItem("resta"))||[]
  if(data.length == 0){
    console.log("no data available");
  }
  else{
    let result =data.filter(ele => ele.rating >= 4);
    display(result);
  }
})

th300_time.addEventListener("click",()=>{
  let data =JSON.parse(localStorage.getItem("resta")) || []
  if(data.length == 0){
    console.log("No Data available");
  }
  else{
    let result = data.filter(ele => ele.price <= 300);
    display(result);
  }
})

f400_time.addEventListener("click",()=>{
  let data =JSON.parse(localStorage.getItem("resta")) || []
  if(data.length == 0){
    console.log("No Data available");
  }
  else{
    let result = data.filter(ele => ele.price > 300);
    display(result);
  }
})
 

function display(data){ 
  let htmlpage="";
  data.forEach((item) => {
    htmlpage +=  `
      <div class="food-item-card">
          <a href="restaurant.html?id=${item.id}"><img class="image" src=${item.image}></a>
          <span class="title">${item.name}</span><br>
          <span><i class="fa fa-star" aria-hidden="true"></i><b>${item.rating}</b>  ${item.time}-mins</span><br>
          <span class="type">${item.type}</span><br>
          <span>${item.city}</span><br>
          <span>AVG RS ${item.price}</span><br>
      </div>
    `;
  });
  foodContainer.innerHTML=htmlpage;
};
newdata();
      