// Global variables
var instrument_map = ["gong_g", "gong_p", "gong_t", "kempli", "jegogan", "calung", "penyacah"];
var gongs = ["gong_g", "gong_p", "gong_t", "kempli"]
var current_instrument_selector = 0;
var current_instrument = instrument_map[current_instrument_selector];
var num_instruments = instrument_map.length;
var shifted = false; 
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

function playSound(instrument, key, shifted) {
    console.log('playSound: ', instrument, key, shifted);

}


$(document).ready(function() {
    // Make instruments clickable
    $('.touchable').click(function(e) {  
        var instrument_id = e.target.id;
        console.log(instrument_id);
        // Call correct sound
        if (instrument_id == "gong_g_touch") {
            playSound('gong_g', 0, false);
        }
        if (instrument_id == "gong_p_touch") {
            playSound('gong_p', 0, false);
        }
        if (instrument_id == "gong_t_touch") {
            playSound('gong_t', 0, false);
        }
        if (instrument_id == "kempli_touch") {
            playSound('kempli', 0, false);
        }

        if (instrument_id == "j1") {
            playSound('jegogan', 1, false);
        }
        if (instrument_id == "j2") {
            playSound('jegogan', 2, false);
        }
        if (instrument_id == "j3") {
            playSound('jegogan', 3, false);
        }
        if (instrument_id == "j5") {
            playSound('jegogan', 5, false);
        }
        if (instrument_id == "j6") {
            playSound('jegogan', 6, false);
        }

        if (instrument_id == "c1") {
            playSound('calung', 1, false);
        }
        if (instrument_id == "c2") {
            playSound('calung', 2, false);
        }
        if (instrument_id == "c3") {
            playSound('calung', 3, false);
        }
        if (instrument_id == "c5") {
            playSound('calung', 5, false);
        }
        if (instrument_id == "c6") {
            playSound('calung', 6, false);
        }

        if (instrument_id == "p5_low") {
            playSound('penyacah', 5, true);
        }
        if (instrument_id == "p6_low") {
            playSound('penyacah', 6, true);
        }
        if (instrument_id == "p1") {
            playSound('penyacah', 1, false);
        }
        if (instrument_id == "p2") {
            playSound('penyacah', 2, false);
        }
        if (instrument_id == "p3") {
            playSound('penyacah', 3, false);
        }
        if (instrument_id == "p5") {
            playSound('penyacah', 5, false);
        }
        if (instrument_id == "p6") {
            playSound('penyacah', 6, false);
        }
    });
});

$(document.body).keydown(function(e) {
    var code = e.keyCode || e.which;

    // Capture TAB keypress  
    if (code === 9) {  
        e.preventDefault();
        console.log('TAB pressed');
        // Cycle instruments on TAB press
        cycleInstruments();
    }

    // Capture SPACE keypress
    if (code === 32) {  
        e.preventDefault();
        console.log('SPACE pressed');
        // Check which instrument is selected
        if (gongs.indexOf(current_instrument) >= 0) { 
            // Gong selected, trigger play
            playSound(current_instrument, 0, false);
        }
    }

    // Capture NUMBER keypress
    number_set = [49, 50, 51, 53, 54];
    if (number_set.indexOf(code) >= 0) { 
        e.preventDefault();
        console.log('NUMBER pressed: ', code, "  Shift: ", shifted); 
        // Check which instrument is selected
        if (gongs.indexOf(current_instrument) < 0) { 
            // Core melody instrument selected, trigger play
            playSound(current_instrument, code - 48, shifted); // offset to get key number
        }
    }
});

// Tracks SHIFT key's status
$(document).on('keyup keydown', function(e) {
    shifted = e.shiftKey
});