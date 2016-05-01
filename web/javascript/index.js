// Global variables
var instrument_map = ["gong_g", "gong_p", "gong_t", "kempli", "jegogan", "calung", "penyacah"];
var current_instrument_selector = 0;
var current_instrument = instrument_map[current_instrument_selector];
var num_instruments = instrument_map.length;

// Functions
function cycleInstruments() {

    // Get current instrument 
    old_instrument = current_instrument;

    // Update global variables
    current_instrument_selector = (current_instrument_selector + 1) % num_instruments;
    current_instrument = instrument_map[current_instrument_selector];
    console.log('cycled instrument to: ', current_instrument);

    // Update old/new instrument object classes 
    old_instrument_string = "#" + old_instrument
    current_instrument_string = "#" + current_instrument
    $(current_instrument_string).addClass("selected")
    $(old_instrument_string).removeClass("selected")
}

function determineSound() {
    
}

function playSound() {

}

$(document).ready(function() {
    // Make instruments clickable
    $('.touchable').click(function(e) {  
        console.log(e.target.id);
        // call music playing function here
    });
});

$(document.body).keydown(function(e) {
    var code = e.keyCode || e.which;
    // Capture TAB keypress
    if (code === 9) {  
        e.preventDefault();
        cycleInstruments();
    }
});