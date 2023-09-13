const cartCount = document.getElementsByClassName('itemCount')[0];
const cart = document.getElementsByClassName("cart-icon")[0];
const addToCartButton = document.getElementsByClassName("addToCartButton");

var productArray = [];
var clickCount = 0;

for(let i=0; i<addToCartButton.length; i++){
    addToCartButton[i].addEventListener("click", ()=>{
        if(clickCount < 8){
            let chocolate = addToCartButton[i].attributes.data.value;
            let ifExist = false;
            let index = 0;
            for(let i=0; i<productArray.length; i++){
                if(productArray[i].name === chocolate.split(";")[0]){
                    ifExist = true;
                    index = i;
                }
            }
            if(ifExist){
                productArray[index].qty+=1;
                productArray[index].price += parseInt(chocolate.split(";")[1]);
            }else{
                let temp = {};
                temp.name = chocolate.split(";")[0];
                temp.qty = 1;
                temp.price = parseInt(chocolate.split(";")[1]);
                productArray.push(temp);
            }

            clickCount+=1;
            cartCount.innerHTML=clickCount;
        }
        else{
            window.alert("You can only add 8 items to yoour cart")
        }
    })
}

function creaeteListItem(name, qty, price){
    let listItem = document.createElement("div");
    listItem.classList.add("listItem");

    let itemName = document.createElement("div");
    itemName.classList.add("itemName");
    itemName.innerText = name;

    let quantity = document.createElement("div");
    quantity.classList.add("quantity");
    quantity.innerText = qty;

    let productPrice = document.createElement("div");
    productPrice.classList.add("productPrice");
    productPrice.innerText = price;

    listItem.appendChild(itemName);
    listItem.appendChild(quantity);
    listItem.appendChild(productPrice);

    return listItem;
}

cart.addEventListener("click", ()=>{
    document.getElementsByClassName("cartPage")[0].style.visibility = "visible";
    console.log(productArray);
    let total = 0;
    for(let i=0; i<productArray.length; i++){
        let list = document.getElementsByClassName("cartProductList")[0];

        if(i===0){
            while(list.firstChild){
                list.removeChild(list.firstChild);
                total = 0;
            }
        }

        let listItem = creaeteListItem(productArray[i].name, productArray[i].qty, productArray[i].price);
        list.appendChild(listItem);

        total+=productArray[i].price;

        if(i+1 === productArray.length){
            let listItem = creaeteListItem("Total", "", total);
            listItem.style.borderTop = "1px solid black"
            list.appendChild(listItem);
        }
    }
})
document.getElementsByClassName("closeCart")[0].addEventListener("click",()=>{
    document.getElementsByClassName("cartPage")[0].style.visibility = "hidden";
})