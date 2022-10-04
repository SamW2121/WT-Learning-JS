/*
 * Example 04 - Counting
 */

const doc = document
let output = ""
for ( let count = 1; count < 11; count++ ) {
    output += "<p>Count is " + count.toString() + "</p>"
    doc.getElementById( "output-area" ).innerHTML = output
}
