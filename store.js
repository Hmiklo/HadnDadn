if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
var removeCart = document.getElementsByClassName('btn-danger')
for (var i = 0; i < removeCart.length; i++) {
    var button = removeCart[i]
    button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-q-input')
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
    }
}
var addToCartButtons = document.getElementsByClassName('shop-item-btn')
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purcaseClicked)

    function purcaseClicked() {
        alert('Оплачено, спасибо!')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal()
    }

function removeCartItem(event) {
var buttonClicked = event.target
buttonClicked.parentElement.parentElement.remove()
updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-img')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.innerText = title
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Уже в руках')
            return
        }
    } 
    var cartRowContenets = `
        <div class="cart-item cart-column">
            <img class="cart-item-img" src="${imageSrc}" width="70">
            <span class="cart-item-title">${title}</span>
        </div>
            <span class="cart-price cart-column">${price}</span>
        <div class="cart-q cart-column">
            <input class="cart-q cart-q-input" type="number" value="1">
            <button class="btn btn-danger" role="button">уронить</button>
        </div>`
    cartRow.innerHTML = cartRowContenets
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-q-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemCont = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemCont.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceelement = cartRow.getElementsByClassName('cart-price')[0]
        var qelement = cartRow.getElementsByClassName('cart-q-input')[0]
        var price = parseFloat(priceelement.innerText.replace('₽', ''))
        var quantity = qelement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + '₽'
}