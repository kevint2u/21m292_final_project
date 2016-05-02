// Global variables
var instrument_map = ["gong_g", "gong_p", "gong_t", "kempli", "jegogan", "calung", "penyacah"];
var gongs = ["gong_g", "gong_p", "gong_t", "kempli"]
var current_instrument_selector = 0;
var current_instrument = instrument_map[current_instrument_selector];
var num_instruments = instrument_map.length;
var shifted = false; 

// Audio variables
var placeholder;
var gong_g_audio = new Audio("../web/resources/recordings/cut/gong_g.wav");
var gong_p_audio = new Audio("../web/resources/recordings/cut/gong_p.wav");
var gong_t_audio = new Audio("../web/resources/recordings/cut/gong_t.wav");
var kempli_audio = new Audio("../web/resources/recordings/cut/kempli.wav");
var j1_audio = new Audio("../web/resources/recordings/cut/j-1.wav");
var j2_audio = new Audio("../web/resources/recordings/cut/j-2.wav");
var j3_audio = new Audio("../web/resources/recordings/cut/j-3.wav");
var j5_audio = new Audio("../web/resources/recordings/cut/j-5.wav");
var j6_audio = new Audio("../web/resources/recordings/cut/j-6.wav");
var c1_audio = new Audio("../web/resources/recordings/cut/c-1.wav");
var c2_audio = new Audio("../web/resources/recordings/cut/c-2.wav");
var c3_audio = new Audio("../web/resources/recordings/cut/c-3.wav");
var c5_audio = new Audio("../web/resources/recordings/cut/c-5.wav");
var c6_audio = new Audio("../web/resources/recordings/cut/c-6.wav");
var p5_low_audio = new Audio("../web/resources/recordings/cut/p-5-low.wav");
var p6_low_audio = new Audio("../web/resources/recordings/cut/p-6-low.wav");
var p1_audio = new Audio("../web/resources/recordings/cut/p-1.wav");
var p2_audio = new Audio("../web/resources/recordings/cut/p-2.wav");
var p3_audio = new Audio("../web/resources/recordings/cut/p-3.wav");
var p5_audio = new Audio("../web/resources/recordings/cut/p-5.wav");
var p6_audio = new Audio("../web/resources/recordings/cut/p-6.wav");
var last_played_key;

var audio_map_gongs = [gong_g_audio, gong_p_audio, gong_t_audio, kempli_audio];
var audio_map_j = [j1_audio, j2_audio, j3_audio, placeholder, j5_audio, j6_audio];
var audio_map_c = [c1_audio, c2_audio, c3_audio, placeholder, c5_audio, c6_audio];
var audio_map_p = [p1_audio, p2_audio, p3_audio, placeholder, p5_audio, p6_audio, p5_low_audio, p6_low_audio];
var audio_map_master = [audio_map_gongs, audio_map_j, audio_map_c, audio_map_p];
// Functions
function cycleInstruments() {

    // Get current instrument 
    old_instrument = current_instrument;

    // Update global variables
    if (shifted == true) {
        if (current_instrument_selector == 0) {
            current_instrument_selector += 6;
        }
        else {
            current_instrument_selector = (current_instrument_selector - 1) % num_instruments;
        }
    }
    else {
        current_instrument_selector = (current_instrument_selector + 1) % num_instruments;
    }                   
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
    
    // If gong, simply play sound
    if (gongs.indexOf(instrument) >= 0) { 
        current_index = gongs.indexOf(instrument);
        current_audio = audio_map_gongs[current_index];
    }
    // Else, convert instrument to file name, then play
    else {
        if (instrument == "jegogan") {
            current_audio = audio_map_j[key-1];
        }
        if (instrument == "calung") {
            current_audio = audio_map_c[key-1];
        }
        if (instrument == "penyacah") {
            if (shifted == true) {
                if ((key ==5) || (key ==6)) {
                    current_audio = audio_map_p[key+1];
                }
            }
            else {
                current_audio = audio_map_p[key-1];
            }
        }
    }
    current_audio.pause();
    current_audio.currentTime = 0;
    current_audio.play();
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

    // Capture ESC keypress  
    if (code === 27) {  
        e.preventDefault();

        gong_g_audio.pause();
        gong_p_audio.pause();
        gong_t_audio.pause();
        kempli_audio.pause();
        j1_audio.pause();
        j2_audio.pause();
        j3_audio.pause();
        j5_audio.pause();
        j6_audio.pause();
        c1_audio.pause();
        c2_audio.pause();
        c3_audio.pause();
        c5_audio.pause();
        c6_audio.pause();
        p5_low_audio.pause();
        p6_low_audio.pause();
        p1_audio.pause();
        p2_audio.pause();
        p3_audio.pause();
        p5_audio.pause();
        p6_audio.pause();

        gong_g_audio.currentTime = 0;
        gong_p_audio.currentTime = 0;
        gong_t_audio.currentTime = 0;
        kempli_audio.currentTime = 0;
        j1_audio.currentTime = 0;
        j2_audio.currentTime = 0;
        j3_audio.currentTime = 0;
        j5_audio.currentTime = 0;
        j6_audio.currentTime = 0;
        c1_audio.currentTime = 0;
        c2_audio.currentTime = 0;
        c3_audio.currentTime = 0;
        c5_audio.currentTime = 0;
        c6_audio.currentTime = 0;
        p5_low_audio.currentTime = 0;
        p6_low_audio.currentTime = 0;
        p1_audio.currentTime = 0;
        p2_audio.currentTime = 0;
        p3_audio.currentTime = 0;
        p5_audio.currentTime = 0;
        p6_audio.currentTime = 0;
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