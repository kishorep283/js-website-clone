let cart=JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);
function cartdisplay(){
    let cartcontainer =document.querySelector(".cart-items");
    let totalprice = document.querySelector(".total-price");
    let totalitems=document.querySelector(".total-items");

    let price=0;
    let items=0;
    if(cart.length == 0){
        cartcontainer.innerHTML = "<p>Your cart is empty!</p>";
        totalprice = 0;
        totalitems = 0;
        window.location.reload();
    }
    cart.forEach((prod,index) => {
        items += prod.quantity;
        price += parseFloat(prod.price) * prod.quantity;
        let itemsdiv =document.createElement("div");
        itemsdiv.className="items-list";
        itemsdiv.innerHTML=`
        <img src="${prod.image}" alt="${prod.name}" class="item-image">
       <div class="item-details">
        <h3>${prod.name}</h3>
        <p>Price: ${prod.price}</p>
        <p>Quantity: 
          <button class="quantity-btn decrease" data-index="${index}">-</button>
          <span>${prod.quantity}</span>
          <button class="quantity-btn increase" data-index="${index}">+</button>
        </p>
        <button class="remove-item" data-index="${index}">Remove</button>
      </div>
    `;
    cartcontainer.appendChild(itemsdiv);

    })
    totalprice.innerText= price;
    totalitems.innerText=items;

}

function updatecartpage(){
    localStorage.setItem("cart",JSON.stringify(cart));
    cartdisplay();
}

function handlequantitychanges(event){
    let index = event.target.dataset.index;
    if(event.target.classList.contains("increase")){
        cart[index].quantity += 1;
        window.location.reload();
    }
    else if(event.target.classList.contains("decrease") && cart[index].quantity > 1){
        cart[index].quantity -= 1;
        window.location.reload();
    }
    else if(event.target.classList.contains("decrease") && cart[index].quantity === 1){
        cart.splice(index,1);
        window.location.reload();
    }
    updatecartpage();
}
function removecartitem(event){
    let index = event.target.dataset.index;
    cart.splice(index,1);
    window.location.reload();
    updatecartpage();
} 
document.querySelector(".cart-items").addEventListener("click",(event)=>{
    if(event.target.classList.contains("quantity-btn")){
        handlequantitychanges(event);
    }
    if(event.target.classList.contains("remove-item")){
        removecartitem(event);
    }
})

document.getElementById("check-btn").addEventListener("click",(event) => {
    event.preventDefault();
    if(cart.length === 0){
        alert("your cart is Empty");
    }
    const paymethod = document.querySelector(
        'input[name="payment-method"]:checked'
    );
    if(!paymethod){
        alert("Select any of the method");
        return;
    }

    alert(`Payment method selected: ${paymethod.value}\nProceeding to payment...`)
    newwindow = window.open(
        "http://127.0.0.1:5500/succ.html",
        "newWindow",
        "width=800,height=600,resizable=yes"
    );
    newwindow.close();
    
    
    localStorage.removeItem("cart");
    cart=[];
    updatecartpage();
})



cartdisplay();