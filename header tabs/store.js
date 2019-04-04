if (document.readyState == 'loading') {
    document.addEventListener('DOMConentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart_quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('Shop_item_button')
	for (var i = 0; i < addToCartButtons.length; i++) {
		var button = addToCartButtons[i]
		button.addEventListener('click', addToCartClicked)
	}
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
//var removeCartItemButtons is our variable which will have a function(s) assigned to it
//document.getElementsByClassName('btn-danger') is a function that calls an element from our HTML doc (Merchandise.html)
//console.log(removeCartItemButtons) will call the class item via the console
//for var i, given that i is less than the number of items with classname - add value/interger
//for any variable i (the remove button), assign as variable 'button'
//event listener will wait for the button to be clicked and will assign a function to it. var buttonClicked based on its parent element will remove itself from the doc.


function addToCartClicked(event){
	var button = event.target
	var shopItem = button.parentElement.parentElement
	var title = shopItem.getElementsByClassName('shop_item_title')[0].innerText
	var price = shopItem.getElementsByClassName('shop_item_price')[0].innerText
	var imageSrc = shopItem.getElementsByClassName('shop_item_image')[0].src
	console.log(title, price, imageSrc)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('shopping_cart')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart_item')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart_price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart_quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('£', ''))//parseFloat converts string to interger values // meanwhile innterText shows only the text value of the item pricevia the console//the replace function replaces values use the second logical input.
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
	total = Math.round(total * 100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText = total
}