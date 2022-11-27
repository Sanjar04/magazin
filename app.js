
import {data} from "./data.js";

let elproducts = document.querySelector(".products__list");
let elcart = document.querySelector(".cart__list");
let priceTitle = document.querySelector(".cart__title")

let cartList = [];

const totalPrice = () => {
   const price = cartList.reduce((a,b)=> a + b.clientPrice ,0);
   priceTitle.textContent =   `${price} $`
}

function renderProduct(item){
   elproducts.innerHTML = ""
   for(let i of item){
      if(i.count > 0){
         let li = document.createElement("li");
         li.className = "products__item";
         li.innerHTML = `
         <div class="products__img">
            <img src="${i.img}" alt="">
         </div>
         <div class="products__content">
            <h2>${i.name}</h2>
            <p>${i.price} $</p>
            <button id="${i.id}" class="add-btn">+</button>
            <span>${i.count} Ta qoldi</span>
            <button id="${i.id}" class="remove-btn">-</button>
         </div>
         `;
         elproducts.append(li);
      }
   }
}
renderProduct(data);

function renderCart(item){
   totalPrice()
   elcart.innerHTML = ""
   for(let i of item){
      if(i.clientPrice > 0){
         let li = document.createElement("li");
         li.className = "products__item";
         li.innerHTML = `
         <div class="products__img">
            <img src="${i.img}" alt="">
         </div>
         <div class="products__content">
            <h2>${i.name}</h2>
            <p>${i.clientPrice} $</p>
            <span>${i.count} ta</span>
         </div>
         `;
         elcart.append(li);
      }
   }
}

elproducts.addEventListener("click", (evn)=>{
   if(evn.target.className === 'add-btn'){
      for(let i of data){
         if(i.id === Number(evn.target.id)){
            let obj = cartList.some((find)=> find.id == evn.target.id);
            i.count -= 1;
            if(!obj){
               cartList.push({...i,clientPrice:i.price,count:1})
            }
            else{
               for(let oldProduct of cartList){
                  if(evn.target.id == oldProduct.id){
                     oldProduct.count += 1;
                     oldProduct.clientPrice = oldProduct.price * oldProduct.count
                  }
               }
            }
         }
      }
   }
   if(evn.target.className === 'remove-btn'){
      for(let i of cartList){
         if(i.id == evn.target.id && i.count > 0){
            i.count -= 1;
            i.clientPrice = i.price * i.count

            for(let j of data){
               if(j.id == evn.target.id){
                  j.count += 1;
               }
            }
         }
      }
   }
   renderCart(cartList);
   renderProduct(data);
})