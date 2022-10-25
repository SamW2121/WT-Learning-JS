const delay = 1000
const clearDelay = delay - 100
const outputZone = document.getElementById( "OutputZone" )

function sleep( ms ) {
    return new Promise( resolve => setTimeout( resolve, ms ) );
}

function doSomethingStrange() {
    outputZone.innerHTML += "<p>Hello World</p>"
}

function clearOutput() {
    outputZone.innerHTML = ""
}

async function drawSomething() {
    for ( let count = 0; count < 10; count++ ) {
        if ( count % 3 === 1 ) {
            await sleep( clearDelay )
            clearOutput()
        }
        await sleep( delay )
        doSomethingStrange()
    }
}

outputZone.innerHTML = "<h1>Nothing to see here</h1>"

drawSomething()
