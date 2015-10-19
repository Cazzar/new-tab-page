//Set Public Variables --Scratch
//clean it up shitface

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

var cfg;
var cfg_bool;
var scratch;
var blocks;

function styleJq() {
    $("span").css("fontFamily", cfg.heading_font); //COMMENT THESE BETTER
    $("a").css("fontFamily", cfg.link_font);
    $("#popup").css("fontFamily", cfg.link_font);
    $("span").css("fontSize", cfg.heading_font_size);
    $("a").css("fontSize", cfg.link_font_size);
    $("#popup").css("fontSize", cfg.link_font_size);
    //$("body").css("backgroundColor", cfgO.background);
    $(".sqr").css("backgroundColor", cfg.foreground);
    $("#popup").css("backgroundColor", cfg.foreground);
    $("span").css("color", cfg.heading_colour);
    $("a").css("color", cfg.link_colour);
    $("#popup").css("color", cfg.link_colour);
    $(".sqr").css("borderTop", "0 solid " + cfg.border_colour);
    $(".sqr").css("borderBottom", "0 solid " + cfg.border_colour);
    $("#popup").css("borderTop", cfg.border_width + " solid " + cfg.border_colour);
    if (!!$(".searchinput")) {
        $("#searchinput").css("color", cfg.search_colour);
        $("#searchinput").css("backgroundColor", cfg.search_bg_colour);
        $("#searchinput").css("font-family", cfg.search_font);
        $("#searchinput").css("font-size", cfg.link_font_size);
    }
    if (cfg_bool.mascot) { //If Mascot is used
        $("#bgimg").css("backgroundImage", "url('" + cfg.ref + "')"); //Mascot Path
        $("#bgimg").css("bottom", cfg.bottom); //Box Model
        $("#bgimg").css("right", cfg.right);
        $("#bgimg").css("height", cfg.height);
        $("#bgimg").css("width", cfg.width);
        $("#bgimg").css("opacity", cfg.opacity); //Transparency
    } else {
        $("#bgimg").css("backgroundImage", ""); //If mascot is false - should be destroy but oh well
    }
    if (cfg_bool.uppercase) {
        $(".sqr").css("text-transform", "uppercase"); //Sets all text in squares to Uppercase
    }
}



//Load Settings from JSON

function writeLog(log, level) {
    if (level <= scratch.verbose_level) console.log(log);
}

function setupBlocks() {
    var cellString = "";
    writeLog("Setting Up Blocks", 1);

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
    var container = $(".container");
    writeLog("Fixing Jitter", 1);
    container.css("height", window.innerHeight - 0.5 + "px");
}


function popup(obj, msg, visibility) {
    writeLog("Toggle Visibility", 2);
    if (!visibility) {
        obj.innerHTML = msg;
        obj.style.bottom = "-" + cfg.border_width;
    } else {
        obj.style.bottom = -300 + "px";
    }
}

function helpCommandCheck(input) {
    writeLog("Checking Help Command", 2);
    var myVar;
    helpArr.forEach(function (entry) {
        if (input == entry.command) {
            myVar = true;
            helpInput = entry.type;
        }
    }, this);

    return myVar;
}


//Do the Search
function search(query) {
    writeLog("Executing Query", 1);
    var command = query.substr(0, 2); //Store our first command
    var fallback = true;
    var bookmark;

    if (helpCommandCheck(query) !== null) {
        switch (helpInput) {
            case "search":
                popup(window.popupDiv, helpString, window.HelpVisibility);
                window.HelpVisibility = !window.HelpVisibility;
                fallback = false;
                break;
            case "command":
                popup(window.popupDiv, commandString, window.HelpVisibility);
                window.HelpVisibility = !window.HelpVisibility;
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
                action.bookmark.forEach(function (bookMark) {
                    if (bookMark[0] == commandObj.input) {
                        bookmark = action.bmPrefix + bookMark[1];
                    }
                }, this);
                fallback = false; //Store data to say that we have a match
                if (bookmark !== undefined) {
                    window.location = bookmark;
                } else {
                    action.replaceChars.forEach(function (char) { //For Each Element in our Replace Character
                        commandObj.input = commandObj.input.replaceChars(char[0], char[1]); //Replace them
                    }, this);
                    window.location = action.url + commandObj.input; //Go To search page
                }
            }
        }, this);
    } else { //It definatly not a subcommand ---- Make an elseif with another subcommand prefix if desired, objects and arrays will need to be created
        var searchObj = {
            prefix: query.substr(0, 2), //Store command
            input: query.substr(3) //Store input data
        };

        searchArr.forEach(function (action) { //scan array of search elements
            if (searchObj.prefix == action.command) { //If our prefix matches our command
                action.bookmark.forEach(function (bookMark) { //for each stored bookmark
                    if (bookMark[0] == searchObj.input) { //Check if our input matches
                        bookmark = action.bmPrefix + bookMark[1]; //if match store in variable
                    }
                }, this);
                fallback = false; //Store data to say that we have a match
                console.log(bookmark && null);
                if (bookmark !== undefined) { //If we have a bookmark stored
                    window.location = bookmark; //Go To Book mark
                } else { //Else
                    action.replaceChars.forEach(function (char) { //scan over it's query replacements
                        searchObj.input = searchObj.input.replaceChars(char[0], char[1]); //Replace all characters that are needed
                    }, this);
                    window.location = action.url + searchObj.input; //Go to search page
                }
            }

        }, this);
    }

    if (fallback) { //If we search was unsucessfull, check bookmarks
        bookArr.forEach(function (action) {
            if (action.command == query) {
                window.location = action.url;
                fallback = false;
            }
        }, this);
    }

    if (fallback) { //If our search was still unsuccessful
        searchArr[0].replaceChars.forEach(function (char) { //Our default is the first in the file
            query = query.replaceChars(char[0], char[1]); //Replace it's characters for a likable query
        }, this);
        window.location = searchArr[0].url + query; //Go to search page
    }
}


window.onresize = function () {
    fixJitter();
};

// expanding and contracting squares
function expand() {
    writeLog("Expand Action", 2);
    var acount = this.getElementsByTagName("a").length;
    var icount = this.getElementsByTagName("input").length;
    if (icount >= 1) {
        this.style.height = 300 + 37 * icount + "px";
    } else {
        this.style.height = 300 + 25 * acount + "px";
    }
    if (cfg_bool.borders) {
        this.style.borderTop = cfg.border_width + " solid " + cfg.border_colour;
        this.style.borderBottom = cfg.border_width + " solid " + cfg.border_colour;
    }
}
function contract() {
    writeLog("Contract Action", 2);
    this.style.height = "150px";
    this.style.borderTop = "0 solid" + cfg.border_colour;
    this.style.borderBottom = "0 solid" + cfg.border_colour;
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
window.onunload = function() {
    delete window.cfg;
    delete window.cfg_bool;
    delete window.scratch;
    delete window.blocks;
};

$(document).ready(function() {
    //Scratch
    var tempBackgroundString;
    var usBg = false;
    switch (scratch.background_type) {
        case "mp4":
            tempBackgroundString = '<video autoplay loop id="bgvid"><source src="resources/' + scratch.background + '" type="video/mp4"></video>';
            usBg = true;
            break;
        case "webm":
            tempBackgroundString = '<video autoplay loop id="bgvid"><source src="resources/' + scratch.background + '" type="video/webm"></video>';
            usBg = true;
            break;
        case "ogg":
            tempBackgroundString = '<video autoplay loop id="bgvid"><source src="resources/' + scratch.background + '" type="video/ogg"></video>';
            usBg = true;
            break;
        case "clr":
            $("body").css("backgroundColor", scratch.background);
        case "img":
            $("body").css("backgroundImage", scratch.background);
            break;
    }
    if (usBg) {//If we are using a background video, change page for these changes
        document.body.innerHTML += tempBackgroundString; //Add video string to webpage body
        $("#bgvid").css("opacity", scratch.opacity); //Set it's opacity
    }
    
    //Set Tab Title
    document.title = scratch.title; //Set tab title
    
    //set command prefix variable
    commandPrefix = scratch.command_prefix; //Prefix to use to destinct commands
    commandArr.forEach(setCommandString); //Now with the command prefix, make the string

    useJsBlocks = blocks.useLinkJs;
    
    
    writeLog("Execute Onload", 1);
    if (useJsBlocks === true) {
        writeLog("Using JS Setup", 1);
        setupBlocks();
    }
    styleJq();
    fixJitter();
    window.HelpVisibility = false;
    window.popupDiv = $(".popup");
    
    
    // search
    var searchinput = $("#searchinput");


    if (searchinput.length) {
        searchinput.keypress(function (a) {
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
            var search_sqr = $(".search_sqr");
            search_sqr.style.height = 300 + 37 + "px";
            search_sqr.style.borderTop = cfg.border_width + " solid " + cfg.border_colour;
            search_sqr.style.borderBottom = cfg.border_width + " solid " + cfg.border_colour;
            $(".searchinput").focus();
        }

        if (9 == key) {
            a.preventDefault();
        }
    });

    // close popup when clicked
    window.popupDiv.click( function () {
        popup(this, "", window.HelpVisibility);
        window.HelpVisibility = !window.HelpVisibility;
    });

    // adding event listeners to squares or expanding them onload
    var sqr = document.querySelectorAll(".sqr");
    if (!cfg_bool.alwaysopen) {
        for (var i = 0; i < sqr.length; ++i) {
            sqr[i].addEventListener("mouseover", expand, false);
            sqr[i].addEventListener("mouseout", contract, false);
        }
    } else {
        for (var j = 0; j < sqr.length; ++j) {
            var a = 0;
            for (var x = 0; x < sqr.length; ++x) {
                if (a < sqr[x].getElementsByTagName("a").length) {
                    a = sqr[x].getElementsByTagName("a").length;
                }
            }
            sqr[j].style.height = 225 + 25 * a + "px";
            if (cfg_bool.borders) {
                sqr[j].style.borderTop = cfg.border_width + " solid " + cfg.border_colour;
                sqr[j].style.borderBottom = cfg.border_width + " solid " + cfg.border_colour;
            }
        }
    }
});