/** ./assets/js/example-02.js **/

/* attach onClick to the button */
let myButton1 = document.getElementById("myButton1")
myButton1.onclick = function(){
    alert(new Date());
}

/* create an event listener */
let myButton2 = document.getElementById("myButton2")
let myButton2Clicked = function(){
    alert("This is Button 3");
}
myButton2.addEventListener('click', myButton2Clicked, false)


/** Change the box colour **/
let colours = document.getElementById('colours');
const displayColours = document.getElementById('displayColour')
colours.onchange = function() {
    displayColours.innerHTML =
        '<span style="color: ' +
        this.value + '">' +
        this.value +
        '</span>';
};
