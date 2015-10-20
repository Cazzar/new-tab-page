var helpInput = "", helpString = "", commandString = "";

//Generate Help Command Popup String
function setHelpString(array) {     //Define Function
    helpString += array.command + " " + array.name + "<br>";
}

function setCommandString(array) { //Define Function
    commandString += cfg.misc.command_prefix + array.command + " " + array.name + "<br>";
}

function helpCommandCheck(input) {
    writeLog("Checking Help Command", 2);
    var myVar = false;
    helpCommands.forEach(function (entry) {
        if (input == entry.command) {
            myVar = true;
            helpInput = entry.type;
        }
    }, this);

    return myVar;
}

function popup(msg, visibility) {
    var obj = $("#popup");
    writeLog("Toggle Visibility", 2);
    if (!visibility) {
        obj.html(msg)
        obj.css({bottom: "-2px"});
    } else {
        obj.css({bottom: -300 + "px"});
    }
}

//Do the Search
function search(query) {
    writeLog("Executing Query", 1);
    var command = query.substr(0, 2); //Store our first command
    var fallback = true;
    var bookmark;

    if (helpCommandCheck(query)) {
        switch (helpInput) {
            case "search":
                popup(helpString, window.HelpVisibility);
                window.HelpVisibility = !window.HelpVisibility;
                fallback = false;
                break;
            case "command":
                popup(commandString, window.HelpVisibility);
                window.HelpVisibility = !window.HelpVisibility;
                fallback = false;
                break;

        }



        //If it's a subcommand
    } else if (command == cfg.misc.command_prefix) {

        var commandObj = {
            prefix: query.substr(2, 2), //Store SubCommand
            input: query.substr(5) //Store input data
        };

        commands.forEach(function (action) { //Scan each array element
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

        searchEngines.forEach(function (action) { //scan array of search elements
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
        bookmarks.forEach(function (action) {
            if (action.command == query) {
                window.location = action.url;
                fallback = false;
            }
        }, this);
    }

    if (fallback) { //If our search was still unsuccessful
        searchEngines[0].replaceChars.forEach(function (char) { //Our default is the first in the file
            query = query.replaceChars(char[0], char[1]); //Replace it's characters for a likable query
        }, this);
        window.location = searchEngines[0].url + query; //Go to search page
    }
}

$(function () {
    var $search_in = $("#search-input");

    if ($search_in.length) {
        $search_in.keypress(function (e) {
            var key = e.keyCode;
            if (key == 13) {
                var query = this.value;
                search(query);
            }
        });
    }

    searchEngines.forEach(setHelpString);   //Set String
    commands.forEach(setCommandString);   //Now with the command prefix, make the string

});