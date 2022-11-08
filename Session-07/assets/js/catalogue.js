const wrapper = document.getElementById("catalogue")

wrapper.innerHTML = ""

data.forEach((product) => {

    // Create the card as an item wrapper
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
    itemImage.src= `assets/images/${product.image}`
    itemImage.alt=product.alt
    // Add the image to the photo area, and add photo to card
    itemPhoto.appendChild(itemImage)
    item.appendChild(itemPhoto);

    // Create item card footer
    let itemFooter = document.createElement('div')
    itemFooter.classList.add("flex", "flex-col", "text-sm", "rounded-b")

    // create item price
    let itemPrice = document.createElement("p")
    itemPrice.classList.add("text-center", "bg-zinc-200", "p-2")
    itemPrice.innerHTML = `$${product.price}`        // Add the price in form $xxxx.xx
    itemFooter.appendChild(itemPrice)

    // Add the add to cart button
    let itemButton = document.createElement("button")
    itemButton.classList.add("bg-blue-200", "border-blue-700", "p-2","rounded-b-md",
                             "hover:bg-blue-700", "hover:text-white",
                             "transition","duration-500")
    itemButton.innerHTML = "Add to Cart"

    // Add info to the button which we will use
    // when we want to save it into Local Storage
    itemButton.dataset.name = product.name
    itemButton.dataset.price = product.price
    itemFooter.appendChild(itemButton)

    item.appendChild(itemFooter)
    // Add the Card to the catalogue
    wrapper.appendChild(item)
    return true
})
