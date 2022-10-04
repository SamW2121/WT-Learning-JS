/*
 * Example 06 - Interaction
 */
let counter = 0
const outputArea = document.getElementById( "output-area" )
const mouseOutput = document.getElementById( "mouse-position" )

function upButton() {
    counter += 1
    outputArea.innerHTML = "<p>Count: " + counter + "</p>"
}

function downButton() {
    counter -= 1
    outputArea.innerHTML = "<p>Count: " + counter + "</p>"
}

function mousePosition( event ) {
    let x = event.clientX
    let y = event.clientY
    mouseOutput.innerHTML = "<p>Pos: " + x.toString() + ","
        + y.toString() + "</p>"
}
