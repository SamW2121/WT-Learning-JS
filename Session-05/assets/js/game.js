/**
 * Game code
 *
 * The 1970's Game of Simon in your browser.
 *
 * Filename: assets/js/game.js
 */

// Initialise variables -----------------------------------
let sequence = []       // holds the colour sequence
let humanSequence = []  // hold the poor human's attempt
let nextSequence = []   // the next sequence of colours
let level = 0           // the number of rounds played

// Elements on page ---------------------------------------
const heading = document.querySelector( '.js-heading' )
const tileContainer = document.querySelector( '.js-container' )
const startButton = document.querySelector( '.js-start' )
const info = document.querySelector( '.js-info' )

// Methods for the game -----------------------------------
function startGame() {
    startButton.classList.add( "hidden" )
    info.classList.remove( "hidden" )
    info.textContent = "Wait for the computer..."
    nextRound()
}

function nextRound() {
    // Add one to the round count
    level += 1
    // disable mouse click events on the tiles
    tileContainer.classList.add( "pointer-events-none" )
    info.textContent = "Wait for the computer"
    heading.textContent = `Level ${ level } of 20`
    // copy all the elements in the "sequence" array to "nextSequence"
    nextSequence = [ ...sequence ]
    nextSequence.push( nextStep() ) // add a new tile to sequence
    playRound( nextSequence )

    sequence = [ ...nextSequence ]
    setTimeout( () => {
        humanTurn( level )
    }, level * 600 + 1000 )
}

function nextStep() {
    const tiles = [ 'red', 'green', 'blue', 'yellow' ]
    const randomTile = tiles[Math.floor(
        Math.random() * tiles.length
    )]
    return randomTile
}

function activateTile( colour ) {
    // find the tile and sound with colour on the page
    const theTile = document.querySelector( `[data-tile='${ colour }']` )
    const theSound = document.querySelector( `[data-sound='${ colour }']` )
    // Highlight the tile and play sound
    theTile.classList.add(
        'shadow-md',
        'shadow-neutral-700',
        `bg-${ colour }-200`,
        'transition'
     )
    theTile.innerHTML = "<p class='text-white font-bold' >BUZZ</p>"
    theSound.play()
    // Remove the highlight after approx 1/3 second
    setTimeout( () => {
        theTile.classList.remove(
            'shadow-md',
            'shadow-neutral-700',
            `bg-${ colour }-200`,
            'transition'
         )
        theTile.innerHTML = ""
    }, 300 )
}

function playRound( sequence ) {
    nextSequence.forEach( ( colour, index ) => {
        setTimeout( () => {
            activateTile( colour )
        }, ( index + 1 ) * 600 )
    } )
}

function humanTurn( level ) {
    tileContainer.classList.remove( 'pointer-events-none' )
    info.textContent = `Your turn: ${ level } Tap${ level > 1 ? 's' : '' }`
}

function handleClick( tile ) {
    const index = humanSequence.push( tile ) - 1
    const theTile = document.querySelector( `[data-tile='${ tile }']` )
    const sound = document.querySelector( `[data-sound='${ tile }']` )
    theTile.classList.add(
        'shadow-md',
        'shadow-neutral-700',
        `bg-${ tile }-200`,
        'transition'
    )
    sound.play()
    setTimeout( () => {
        theTile.classList.remove(
            'shadow-md',
            'shadow-neutral-700',
            `bg-${ tile }-200`,
            'transition'
        )
        theTile.innerHTML = ""
    }, 300 )

    const remainingTaps = sequence.length - humanSequence.length

    if (humanSequence[index] !== sequence[index]){
        resetGame("OOPS! Game over! You pressed the wrong button.")
        return
    }

    if ( humanSequence.length === sequence.length ) {
        if (humanSequence.length === 20){
            resetGame("WOOOHOOO! You completed all levels")
            return
        }

        humanSequence = []
        info.textContent = "Well done, now onto next sequence..."
        setTimeout( () => {
            nextRound()
        }, 1000 )
        return
    }

    info.textContent = `Your turn: ${ level } Tap${ level > 1 ? 's' : '' }`
}

function resetGame( text ) {
    alert( text )
    sequence = []
    humanSequence = []
    nextSequence = []
    level = 0
    startButton.classList.remove( 'hidden' )
    heading.textContent = "Simon!"
    info.classList.add( 'hidden' )
    tileContainer.classList.add( "pointer-events-none" )
}

// Event Listeners ----------------------------------------
startButton.addEventListener( "click", startGame )

tileContainer.addEventListener( 'click', event => {
    const { tile } = event.target.dataset
    if ( tile ) {
        handleClick( tile )
    }
} )
