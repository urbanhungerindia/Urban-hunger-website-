const menu = [
 {id:"classic-burger",name:"Classic Burger",category:"Burger",price:99,emoji:"🍔",desc:"A juicy, satisfying classic."},
 {id:"cheese-burger",name:"Cheese Burger",category:"Burger",price:129,emoji:"🍔",desc:"Loaded with creamy cheese."},
 {id:"margherita-pizza",name:"Margherita Pizza",category:"Pizza",price:149,emoji:"🍕",desc:"Cheese, tomato and classic flavour."},
 {id:"farmhouse-pizza",name:"Farmhouse Pizza",category:"Pizza",price:199,emoji:"🍕",desc:"A colourful veggie-loaded favourite."},
 {id:"veg-sandwich",name:"Veg Sandwich",category:"Sandwich",price:89,emoji:"🥪",desc:"Fresh, crunchy and delicious."},
 {id:"cheese-sandwich",name:"Cheese Sandwich",category:"Sandwich",price:119,emoji:"🥪",desc:"Toasty comfort with extra cheese."},
 {id:"peri-fries",name:"Peri Peri Fries",category:"Fries",price:79,emoji:"🍟",desc:"Crispy fries with a spicy kick."},
 {id:"veg-momos",name:"Veg Momos",category:"Momos",price:89,emoji:"🥟",desc:"Steamed dumplings with chutney."},
 {id:"cold-coffee",name:"Cold Coffee",category:"Drinks",price:99,emoji:"🥤",desc:"Chilled, creamy coffee refreshment."}
];
const money=n=>"₹"+n.toLocaleString("en-IN");
let cart={}; let active="All";
const $=id=>document.getElementById(id);
const categories=["All",...new Set(menu.map(x=>x.category))];
function renderFilters(){$("filters").innerHTML=categories.map(c=>`<button class="filter ${active===c?"active":""}" data-cat="${c}">${c}</button>`).join("");}
function renderProducts(){const items=active==="All"?menu:menu.filter(x=>x.category===active);$("products").innerHTML=items.map(p=>`<article class="product"><div class="food-art">${p.emoji}</div><div class="product-info"><div class="product-top"><h3>${p.name}</h3><span class="price">${money(p.price)}</span></div><p>${p.desc}</p><button class="add-btn" data-add="${p.id}">＋ Add to cart</button></div></article>`).join("");}
function count(){return Object.values(cart).reduce((a,b)=>a+b,0)}
function subtotal(){return menu.reduce((s,p)=>s+p.price*(cart[p.id]||0),0)}
function renderCart(){
 const entries=menu.filter(p=>cart[p.id]);
 $("cartCount").textContent=count();$("subtotal").textContent=money(subtotal());$("checkoutTotal").textContent=money(subtotal());
 $("checkoutBtn").disabled=!entries.length;
 $("cartItems").innerHTML=entries.length?entries.map(p=>`<div class="cart-row"><div><b>${p.name}</b><small>${money(p.price)} each</small></div><div class="qty"><button data-change="${p.id}" data-delta="-1">−</button><b>${cart[p.id]}</b><button data-change="${p.id}" data-delta="1">＋</button></div></div>`).join(""):`<p class="empty">Your cart is hungry. Add something tasty!</p>`;
}
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2300)}
function openCart(){$("cartDrawer").classList.add("open");$("overlay").classList.add("show");$("cartDrawer").setAttribute("aria-hidden","false")}
function closeCart(){$("cartDrawer").classList.remove("open");$("overlay").classList.remove("show");$("cartDrawer").setAttribute("aria-hidden","true")}
$("filters").addEventListener("click",e=>{const b=e.target.closest("[data-cat]");if(b){active=b.dataset.cat;renderFilters();renderProducts()}});
$("products").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b){cart[b.dataset.add]=(cart[b.dataset.add]||0)+1;renderCart();toast("Added to your cart") }});
$("cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-change]");if(b){const id=b.dataset.change;cart[id]=(cart[id]||0)+Number(b.dataset.delta);if(cart[id]<=0)delete cart[id];renderCart()}});
$("openCart").onclick=openCart;$("closeCart").onclick=closeCart;$("overlay").onclick=closeCart;
$("checkoutBtn").onclick=()=>{closeCart();$("checkoutDialog").showModal()};
$("closeCheckout").onclick=()=>$("checkoutDialog").close();
$("fulfilment").onchange=()=>{$("addressWrap").style.display=$("fulfilment").value==="Shop pickup"?"none":"grid";$("address").required=$("fulfilment").value==="Home delivery"};
document.querySelectorAll('input[name="payment"]').forEach(r=>r.onchange=()=>{$("upiNote").textContent=r.value==="UPI"?"Choose UPI in your WhatsApp/payment app and pay only to the shop's verified UPI ID. The shop must confirm receipt. Never share your UPI PIN or OTP.":"UPI payment will be confirmed by the shop. Do not share your UPI PIN or OTP."});
$("checkoutForm").addEventListener("submit",e=>{
 e.preventDefault();const cfg=window.URBAN_HUNGER_CONFIG||{};const fd=new FormData(e.currentTarget);
 const phone=(cfg.shopWhatsApp||"").replace(/\D/g,"");
 if(!phone||phone==="ADDYOURWHATSAPPNUMBER"){toast("Shop WhatsApp number abhi config.js mein add karna hai");return}
 const lines=menu.filter(p=>cart[p.id]).map(p=>`${p.name} x ${cart[p.id]} = ${money(p.price*cart[p.id])}`);
 const name=fd.get("name"),mobile=fd.get("phone"),fulfilment=fd.get("fulfilment"),address=fd.get("address"),payment=fd.get("payment"),notes=fd.get("notes");
 if(fulfilment==="Home delivery"&&!String(address).trim()){toast("Delivery address enter karein");return}
 const msg=[`*NEW ORDER — ${cfg.shopName||"Urban Hunger"}*`,``,...lines,``,`*Subtotal: ${money(subtotal())}*`,`Name: ${name}`,`Customer mobile: ${mobile}`,`Order type: ${fulfilment}`,address?`Address: ${address}`:"",`Payment: ${payment}`,notes?`Instructions: ${notes}`:"","",`Please confirm availability, delivery charges and final order total.`].filter(Boolean).join("\n");
 window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,"_blank","noopener");
 toast("WhatsApp khul raha hai — shop confirmation ka wait karein");
});
$("year").textContent=new Date().getFullYear();
renderFilters();renderProducts();renderCart();
if("serviceWorker" in navigator && location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
