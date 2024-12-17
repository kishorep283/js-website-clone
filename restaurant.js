let cart = JSON.parse(localStorage.getItem('cart')) || [];
let menuList = document.getElementById("menu-list");
menuList.style.height="0px";
function toggleMenu(){
  if(menuList.style.height == "0px"){
    menuList.style.height = "400px";
  }
  else{
    menuList.style.height = "0px";
  }
}


async function loadRestaurantDetails() {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get("id");
  
    try {
      const response = await fetch("http://localhost:3000/separ");
      const restaurants = await response.json();
      const restaurant = restaurants.find((r) =>parseInt(r.id) === parseInt(restaurantId));
  
      document.getElementById("restaurant-name").innerText = restaurant.name;
      document.getElementById("ratings").innerText = restaurant.rating;
      document.getElementById("price").innerText = restaurant.ratings;
      document.getElementById("cuisine").innerText = restaurant.type;
      document.getElementById("location").innerText = restaurant.city;
      document.getElementById("time").innerText = restaurant.time +" mins";
  
      // Display recommended menu items
      const recommendedContainer = document.getElementById("recommended");
      restaurant.recommended.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "menu-item";
        itemDiv.innerHTML = `
          <div class="rig">
          <h3>${item.name}</h3>
          <p>${"₹"}${item.price}</p>
          <p><i class="fa fa-star" aria-hidden="true"></i>${" "}${item.rating}</p>
          <p>${item.description}</p>
        </div>
        <div class="lef">
          <img src="${item.image}">
          <button class="cart-items" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">ADD</button>
        </div>
        `;
        recommendedContainer.appendChild(itemDiv);
      });
      document.querySelectorAll(".cart-items").forEach(button => {
        button.addEventListener("click",()=>{
          const prodname = button.dataset.name;
          const prodprice=parseFloat(button.dataset.price);
          const prodimage=button.dataset.image;
          let matching = cart.find(item => item.name === prodname);
          if(matching){
            matching.quantity +=1;
          }else{
            cart.push({
              "name":prodname,
              "price":parseFloat(prodprice),
              "image":prodimage,
              "quantity":1
            })
          }
          const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
          document.querySelector(".spa").innerText = cartQuantity;
          localStorage.setItem("cart",JSON.stringify(cart));
          const feedback = document.createElement("p");
          feedback.innerText="Item Added to Cart";
          feedback.classList.add("feedback-message");
          button.parentNode.insertBefore(feedback, button);
          setTimeout(() => {
            feedback.remove();
        }, 2000);
          console.log(cart);
        });
      });
    } catch (error) {
      console.error("Error loading restaurant details:", error);
    }

  }
  
  
loadRestaurantDetails();
  