const catalogWrapper = document.getElementById("catalogue")
const cartItems = document.getElementById("CartItems")
const theTotalCost = document.getElementById("TotalCost")

// retrieve current cart if it exists. If it doesn't create an empty cart
let cart = JSON.parse(localStorage.getItem("cart")) || []


catalogWrapper.innerHTML = ""
data.forEach((product) => {

    // Create the card as an item catalogWrapper
    let item = document.createElement("div")
    item.classList.add('border-zinc-900', 'border', 'rounded', 'flex', 'flex-col')

    // Insert the card Title with product name
    let itemName = document.createElement('p')
    itemName.classList.add('bg-zinc-900', 'text-white', 'p-2')
    itemName.innerHTML = product.name
    item.appendChild(itemName)

    // create item photo
    let itemPhoto = document.createElement("div")
    itemPhoto.classList.add("overflow-hidden", "p-2", "flex-grow", "flex", "items-center")

    // Add image to photo section
    let itemImage = document.createElement('img')
    itemImage.classList.add("align-middle")
    itemImage.src = `assets/images/${product.image}`
    itemImage.alt = product.alt
    // Add the image to the photo area, and add photo to card
    itemPhoto.appendChild(itemImage)
    item.appendChild(itemPhoto);

    // Create item card footer
    let itemFooter = document.createElement('div')
    itemFooter.classList.add("flex", "flex-col", "text-sm", "rounded-b")

    // create item price
    let itemPrice = document.createElement("p")
    itemPrice.classList.add("text-center", "bg-zinc-200", "p-2")
    // Add the price in form $xxxx.xx
    itemPrice.innerHTML = `$${intToDec2DP(product.price)}`
    itemFooter.appendChild(itemPrice)

    // Add the add to cart button
    let itemButton = document.createElement("button")
    itemButton.classList.add("bg-blue-200", "border-blue-700", "p-2", "rounded-b-md",
        "hover:bg-blue-700", "hover:text-white",
        "transition", "duration-500", "add-to-cart")
    itemButton.innerHTML = "Add to Cart"

    // Add info to the button which we will use
    // when we want to save it into Local Storage
    itemButton.dataset.name = product.name
    itemButton.dataset.price = product.price
    itemFooter.appendChild(itemButton)

    item.appendChild(itemFooter)
    // Add the Card to the catalogue
    catalogWrapper.appendChild(item)
    return true
})

Array.from(document.getElementsByClassName("add-to-cart"))
    .forEach(function (cartButtonElement) {
        cartButtonElement.addEventListener("click", (event) => {

            let newItem = {
                name: event.target.dataset.name,
                price: event.target.dataset.price,
                quantity: 1,
            };

            cart.push(newItem);

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCart(cart)
        });
    });


function updateCart(theCart) {
    let overallPrice = 0
    cartItems.innerHTML = ""

    if (theCart.count === 0) {
        theCart.innerHTML = '<div class="text-center p-2">Cart is Empty</div>\n'
        theTotalCost.innerHTML = "$0.00"
    }

    if (theCart.length) {

        theCart.forEach((cartItem) => {
            overallPrice += parseInt(cartItem.price, 10);

            // Add the item to the on screen cart
            cartItems.innerHTML = `${cartItems.innerHTML}
                <div class='grid grid-cols-12 gap-1 text-xs
                            border border-l-0 border-t-0 border-r-0 border-b-1 border-b-zinc-400'>
                    <p class='bg-red-900 text-white text-bold w-4  text-center'>&times;</p>
                    <p class='col-span-6'>${cartItem.name}</p>
                    <p class='text-right pr-1 border-r border-zinc-900  col-span-2'>${cartItem.quantity}</p>
                    <p class='text-right col-span-3 pr-1'>$${intToDec2DP(cartItem.price)}</p>
                </div>`
        });
        theTotalCost.innerHTML = `$${intToDec2DP(overallPrice)}`;
    }

}

// adds an event listener to clear our cart
document.getElementById("ClearCart").addEventListener("click", () => {
    localStorage.removeItem("cart")
    cart = []
    cartItems.innerHTML = '<div class="text-center p-2">Cart is Empty</div>'
    theTotalCost.innerHTML = `$0.00`;
    updateCart(cart)
});

function intToDec2DP(value) {
    return (value / 100).toFixed(2)
}

updateCart(cart)


