if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  // document
  //   .getElementsByClassName("purchase-btn")[0]
  //   .addEventListener("click", purchaseClicked);
}
var concertArray = [];

function purchaseClicked() {
  alert("Thank you for your purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;

  var delId = buttonClicked.parentElement.parentElement.getElementsByClassName(
    "hidden"
  )[0].innerHTML;
  // console.log("delId");
  // console.log(delId);
  var delIdIndex = concertArray.indexOf(delId);
  concertArray.splice(delIdIndex);

  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  var concertId = shopItem.getElementsByClassName("hidden")[0].innerHTML;
  addItemToCart(title, price, imageSrc, concertId);

  function checkRep(vid) {
    return vid == concertId;
  }
  if (concertArray != []) {
    if (concertArray.filter(checkRep) != concertId) {
      concertArray.push(concertId);
    }
  }

  updateCartTotal();
  // console.log("concert id is:");
  // console.log(shopItem.getElementsByClassName("hidden")[0].innerHTML);
  // console.log("concertArray is:");
  // console.log(concertArray);
}

function addItemToCart(title, price, imageSrc, concertId) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartRowContents = `<div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
          <b id="concert-id" class="hidden">${concertId}</b>
      </div>
      <div>
      <span class="cart-price cart-column">${price}</span>
      <button class="btn btn-danger" type="button">REMOVE</button>
      </div>
      `;

  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    total = total + price;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}

function onPurchase() {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (xhr.status !== 200)
      console.error("[" + xhr.status + "]" + xhr.responseText);
    else console.log(xhr.responseText);
  };
  xhr.setRequestHeader("Content-type", "concertArray");
  xhr.open("PUT", "/purchase", true);
  xhr.send(concertArray);
}
