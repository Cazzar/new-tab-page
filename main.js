//Set Public Variables --Scratch
var helpString = ""; //String of text that is used on help popup

var commandString = ""; //String of text to display on command help popup

var helpInput; // No idea why it needs to be global, doesn't work for some reason if else

var commandPrefix; //Set this from JSON later

//Generate Help Command Popup String
function setHelpString(array) {     //Define Function
    helpString += array.command + " " + array.name + "<br>";
}

function setCommandString(array) { //Define Function
    commandString += commandPrefix + array.command + " " + array.name + "<br>";
}

searchArr.forEach(setHelpString);   //Set String

var useJsBlocks;
var numBlocks;
var searchBlock;

function styleJq() {
    $.getJSON("config.json", function (data) {
        window.cfg = [
            data.style.heading_font,
            data.style.link_font,
            data.style.heading_font_size,
            data.style.link_font_size,
            data.style.background,
            data.style.foreground,
            data.style.heading_color,
            data.style.link_color,
            data.style.border_color,
            data.style.border_width,
            data.style.search_color,
            data.style.search_bg_color,
            data.ext.ref,
            data.ext.bottom,
            data.ext.right,
            data.ext.height,
            data.ext.width,
            data.ext.opacity,
            data.style.search_font
        ];
        window.cfg_bool = [
            data.bool.borders,
            data.bool.alwaysopen,
            data.bool.mascot,
            data.bool.uppercase
        ];


        $("span").css("fontFamily", cfg[0]); //COMMENT THESE BETTER
        $("a").css("fontFamily", cfg[1]);
        $("#popup").css("fontFamily", cfg[1]);
        $("span").css("fontSize", cfg[2]);
        $("a").css("fontSize", cfg[3]);
        $("#popup").css("fontSize", cfg[3]);
        //$("body").css("backgroundColor", cfg[4]);
        $(".sqr").css("backgroundColor", cfg[5]);
        $("#popup").css("backgroundColor", cfg[5]);
        $("span").css("color", cfg[6]);
        $("a").css("color", cfg[7]);
        $("#popup").css("color", cfg[7]);
        $(".sqr").css("borderTop", "0 solid " + cfg[8]);
        $(".sqr").css("borderBottom", "0 solid " + cfg[8]);
        $("#popup").css("borderTop", cfg[9] + " solid " + cfg[8]);
        if (!!document.getElementById("searchinput")) {
            $("#searchinput").css("color", cfg[10]);
            $("#searchinput").css("backgroundColor", cfg[11]);
            $("#searchinput").css("font-family", cfg[18]);
            $("#searchinput").css("font-size", cfg[3]);
        }
        if (cfg_bool[2]) { //If Mascot is used
            $("#bgimg").css("backgroundImage", "url('" + cfg[12] + "')"); //Mascot Path
            $("#bgimg").css("bottom", cfg[13]); //Box Model
            $("#bgimg").css("right", cfg[14]);
            $("#bgimg").css("height", cfg[15]);
            $("#bgimg").css("width", cfg[16]);
            $("#bgimg").css("opacity", cfg[17]); //Transparency
        } else {
            $("#bgimg").css("backgroundImage", ""); //If mascot is false - should be destroy but oh well
        }
        if (cfg_bool[3]) {
            $(".sqr").css("text-transform", "uppercase"); //Sets all text in squares to Uppercase
        }
    });
}



//Load Settings from JSON
$.getJSON("config.json", function (data) {
    window.cfg = [
        data.style.heading_font,
        data.style.link_font,
        data.style.heading_font_size,
        data.style.link_font_size,
        data.style.background,
        data.style.foreground,
        data.style.heading_color,
        data.style.link_color,
        data.style.border_color,
        data.style.border_width,
        data.style.search_color,
        data.style.search_bg_color,
        data.ext.ref,
        data.ext.bottom,
        data.ext.right,
        data.ext.height,
        data.ext.width,
        data.ext.opacity,
        data.style.search_font
    ];
    window.cfg_bool = [
        data.bool.borders,
        data.bool.alwaysopen,
        data.bool.mascot,
        data.bool.uppercase
    ];

    window.scratch = [ //You will need to shift these around later
        data.scratch.background,
        data.scratch.background_type,
        data.scratch.opacity,
        data.scratch.title,
        data.scratch.command_prefix
    ];

    window.blocks = [
        data.scrBlocks.useLinkJs,
        data.scrBlocks.numBlocks,
        data.scrBlocks.SearchBlock
    ];
    
    //Scratch
    var tempBackgroundString;
    var usBg = false;
    switch (scratch[1]) {
        case "mp4":
            tempBackgroundString = '<video autoplay loop id="bgvid"><source src="' + scratch[0] + '" type="video/mp4"></video>';
            usBg = true;
            break;
        case "webm":
            tempBackgroundString = '<video autoplay loop id="bgvid"><source src="' + scratch[0] + '" type="video/webm"></video>';
            usBg = true;
            break;
        case "ogg":
            tempBackgroundString = '<video autoplay loop id="bgvid"><source src="' + scratch[0] + '" type="video/ogg"></video>';
            usBg = true;
            break;
        case "clr":
            $("body").css("backgroundColor", scratch[0]);
        case "img":
        default:
            $("body").css("backgroundImage", scratch[0]);
            break;
    }
    if (usBg) {//If we are using a background video, change page for these changes
        document.body.innerHTML += tempBackgroundString; //Add video string to webpage body
        $("#bgvid").css("opacity", scratch[2]); //Set it's opacity
    }
    
    //Set Tab Title
    document.title = scratch[3]; //Set tab title
    
    //set command prefix variable
    commandPrefix = scratch[4]; //Prefix to use to destinct commands
    commandArr.forEach(setCommandString); //Now with the command prefix, make the string

    useJsBlocks = blocks[0];
    numBlocks = blocks[1];
    searchBlock = blocks[2];



});

function setupBlocks() {
    var cellString = "";

    blockArr.forEach(function (blockArr) {
        if (blockArr.type == "link") {
            cellString += "<div class='sqr'><span>" + blockArr.title + "</span><div class='content'>";
            linksArr.forEach(function (linksArr) {
                if (blockArr.num == linksArr.block) {
                    cellString += "<a href='" + linksArr.href + "'>" + linksArr.name + "</a><br>";
                }

            }, this);
            cellString += "</div></div>";

        }
        if (blockArr.type == "search") {
            cellString += "<div class='sqr' id='search_sqr'><span>" + blockArr.title + "</span><div class='content'>";
            cellString += "<input id='searchinput' type='text' autocomplete='off'>";
        }

        cellString += "</div>";
    }, this);
    cellString += "</div>";
    $("#cell").append(cellString);
}

function fixJitter() {
    var container = document.getElementById("container");
    container.style.height = window.innerHeight - 0.5 + "px";
};


function popup(obj, msg, visibility) {
    if (!visibility) {
        obj.innerHTML = msg;
        obj.style.bottom = "-" + cfg[9];
    } else {
        obj.style.bottom = -300 + "px";
    }
};

function helpCommandCheck(input) {
    var myVar;
    helpArr.forEach(function (entry) {
        if (input == entry.command) {
            myVar = true;
            helpInput = entry.type;
        }
    }, this);

    return myVar;
};


//Do the Search
function search(query) {
    var command = query.substr(0, 2); //Store our first command
    var fallback = true;


    if (helpCommandCheck(query) != null) {
        switch (helpInput) {
            case "search":
                popup(popupDiv, helpString, HelpVisibility);
                HelpVisibility = !HelpVisibility;
                fallback = false;
                break;
            case "command":
                popup(popupDiv, commandString, HelpVisibility);
                HelpVisibility = !HelpVisibility;
                fallback = false;
                break;

        }
    
        //If it's a subcommand
    } else if (command == commandPrefix) {

        var commandObj = {
            prefix: query.substr(2, 2), //Store SubCommand
            input: query.substr(5) //Store input data
        };

        commandArr.forEach(function (action) { //Scan each array element 
            if (commandObj.prefix == action.command) { //If our command is found
                
                action.replaceChars.forEach(function (char) { //For Each Element in our Replace Character
                    commandObj.input = commandObj.input.replaceChars(char[0], char[1]); //Replace them
                }, this);
                fallback = false; //Store data to say that we have a match
                window.location = action.url + commandObj.input; //Go To search page
            }
        }, this);
    } else { //It definatly not a subcommand ---- Make an elseif with another subcommand prefix if desired, objects and arrays will need to be created
        var searchObj = {
            prefix: query.substr(0, 2), //Store command
            input: query.substr(3) //Store input data
        };

        searchArr.forEach(function (action) { //scan array of search elements
            if (searchObj.prefix == action.command) { //If our prefix matches our command
                action.replaceChars.forEach(function (char) { //scan over it's query replacements
                    searchObj.input = searchObj.input.replaceChars(char[0], char[1]); //Replace all characters that are needed
                }, this);
                fallback = false; //Store data to say that we have a match
                window.location = action.url + searchObj.input; //Go to search page
            }

        }, this);
    }

    if (fallback) { //If our search was unsuccessful
        searchArr[0].replaceChars.forEach(function (char) { //Our default is the first in the file
            query = query.replaceChars(char[0], char[1]); //Replace it's characters for a likable query
        }, this);
        window.location = searchArr[0].url + query; //Go to search page
    }
};


window.onresize = function () {
    fixJitter();
};

window.onload = function () {
    console.log(useJsBlocks);
    if (useJsBlocks == true) {
        console.log("Using js setup");
        setupBlocks();
    }
    styleJq();
    fixJitter();
    HelpVisibility = false;
    popupDiv = document.getElementById("popup");
    
    
    // search
    searchinput = document.getElementById("searchinput");


    if (!!searchinput) {
        searchinput.addEventListener("keypress", function (a) {
            var key = a.keyCode;
            if (key == 13) {
                var query = this.value;
                search(query);
            }
        });
    }

    
    // jump to search when tab is pressed
    document.addEventListener("keypress", function (a) {
        var key = a.keyCode;
        if (key == 9) {
            var search_sqr = document.getElementById("search_sqr")
            search_sqr.style.height = 300 + 37 + "px";
            search_sqr.style.borderTop = cfg[9] + " solid " + cfg[8];
            search_sqr.style.borderBottom = cfg[9] + " solid " + cfg[8];
            document.getElementById("searchinput").focus();
        }

        if ([9].indexOf(key) > -1) {
            a.preventDefault();
        }
    });

    // close popup when clicked
    popupDiv.addEventListener("click", function () {
        popup(this, "", HelpVisibility);
        HelpVisibility = !HelpVisibility;
    });

    // adding event listeners to squares or expanding them onload
    var sqr = document.querySelectorAll(".sqr");
    if (!cfg_bool[1]) {
        for (var i = 0; i < sqr.length; ++i) {
            sqr[i].addEventListener("mouseover", expand, false);
            sqr[i].addEventListener("mouseout", contract, false);
        }
    } else {
        for (var i = 0; i < sqr.length; ++i) {
            var a = 0;
            for (var x = 0; x < sqr.length; ++x) {
                if (a < sqr[x].getElementsByTagName("a").length) {
                    a = sqr[x].getElementsByTagName("a").length;
                }
            }
            sqr[i].style.height = 225 + 25 * a + "px";
            if (cfg_bool[0]) {
                sqr[i].style.borderTop = cfg[9] + " solid " + cfg[8];
                sqr[i].style.borderBottom = cfg[9] + " solid " + cfg[8];
            }
        }
    }
}

// expanding and contracting squares
function expand() {
    var acount = this.getElementsByTagName("a").length;
    var icount = this.getElementsByTagName("input").length;
    if (icount >= 1) {
        this.style.height = 300 + 37 * icount + "px";
    } else {
        this.style.height = 300 + 25 * acount + "px";
    }
    if (cfg_bool[0]) {
        this.style.borderTop = cfg[9] + " solid " + cfg[8];
        this.style.borderBottom = cfg[9] + " solid " + cfg[8];
    }
}
function contract() {
    this.style.height = "150px";
    this.style.borderTop = "0 solid" + cfg[8];
    this.style.borderBottom = "0 solid" + cfg[8];
}

// string replacement
String.prototype.replaceChars = function (character, replacement) {
    var str = this;
    var a;
    var b;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == character) {
            a = str.substr(0, i) + replacement;
            b = str.substr(i + 1);
            str = a + b;
        }
    }
    return str;
};

// cleanup
window.onunload = function () {
    delete window.cfg;
    delete window.cfg_bool;
};