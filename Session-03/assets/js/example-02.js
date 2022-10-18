/**
 * Wikipedia search using AJAX
 *
 * AJAX is asynchronous JavaScript and XML.
 * Originally, we question an API on a remote web server, and it returns results as XML.
 * Today most responses from APIs are in JSON format.
 *
 * The Wikipedia API for Searching is shown here:
 * https://www.mediawiki.org/wiki/API:Search
 *
 *
 */

const form = document.getElementById( 'SearchForm' );
form.addEventListener( 'submit', handleSubmit );

async function handleSubmit( event ) {
    // prevent page from reloading when form is submitted
    event.preventDefault();

    // get the value of the input field, and remove any whitespace from the ends
    const inputValue = document.getElementById( 'SearchInput' ).value;
    const searchQuery = inputValue.trim();

    const searchResults = document.getElementById( 'SearchResults' );
    // Clear the previous results
    searchResults.innerHTML = '';

    const spinner = document.getElementById( 'LoadingSpinner' );
    spinner.classList.remove( 'hidden' );

    try {
        const results = await searchWikipedia( searchQuery );
        displayResults( results );
    } catch ( err ) {
        console.log( err );
        alert( 'Failed to search wikipedia' );
    } finally {
        spinner.classList.add( 'hidden' );
    }
}

async function searchWikipedia( searchQuery ) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${ searchQuery }`;
    const response = await fetch( endpoint );
    if ( !response.ok ) {
        throw Error( response.statusText );
    }
    const json = await response.json();
    return json;
}

function displayResults( results ) {
    // Get a reference to the `SearchResults` element
    const searchResults = document.getElementById( 'SearchResults' );

    // Iterate over the `search` array. Each nested object in the array can be
    // accessed through the `result` parameter
    results.query.search.forEach( result => {
        const url = `https://en.wikipedia.org/?curid=${ result.pageid }`;

        // Append the search result to the DOM
        searchResults.insertAdjacentHTML(
            'beforeend',
            `<div class="flex flex-col bg-white my-2 p-4 text-stone-600">
        <h3 class="text-lg text-stone-200 bg-stone-700 pb-1 border-t-1 border-b-stone-500 -mx-4 -mt-4 px-4 pt-2 rounded-t-lg">
            <a href="${ url }" target="_blank" rel="noopener">${ result.title }</a>
        </h3>
        <div class=" border border-stone-500 rounded-b-lg -mx-4 px-4 pb-4 pt-2">
            <p>
                <a href="${ url }" class="text-sm text-stone-500 " target="_blank" rel="noopener">${ url }</a>
            </p>
            <span class="py-2">${ result.snippet }</span>
        </div>
      </div>`
        );
    } );
}

