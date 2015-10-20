var LOG_LEVEL = 0;

var cfg = {
    style: {
        borders: true,
        border_width: "2px",
    },
    background: {
        info: "Little Scarlet Bad Girl.mp4", //just use fucking standard file types.
        type: "video",

        //again, just standard CSS shit
        css: {
            "opacity": 0.3
        },

        mascot: {
            use_mascot: false,
            ref: "file://",
            bottom: "0",
            right: "0",
            height: "500px",
            width: "400px",
            opacity: ".2"
        }
    },

    misc: {
        title: "New Tab",
        command_prefix: ">>"
    }
};

$.expr[':'].focus = function( elem ) {
    return elem === document.activeElement && ( elem.type || elem.href );
};

// string replacement
String.prototype.replaceChars = function (character, replacement) {
    var str = this, a, b;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == character) {
            a = str.substr(0, i) + replacement;
            b = str.substr(i + 1);
            str = a + b;
        }
    }
    return str;
};

function writeLog(log, level) {
    if (level <= LOG_LEVEL) console.log(log);
}

function expand() {
    writeLog("Expand Action", 2);
    var anchors = this.getElementsByTagName("a").length;
    var inputs = this.getElementsByTagName("input").length;

    $(this).css({height: 300 + (37 * inputs) + (25 * anchors) + "px"});

    if (cfg.style.borders) {
        $(this).css({"border-top-width": cfg.style.border_width, "border-bottom-width": cfg.style.border_width})
    }
}
function contract() {
    writeLog("Contract Action", 2);
    $(this).css({"height": "", "border-top-width": "", "border-bottom-width": ""})
}

function setupBlocks() {
    var cellString = "";
    writeLog("Setting Up Blocks", 1);

    window.blocks.forEach(function (block) {
        if (block.type == "link") {
            cellString += "<div class='sqr'><span class='heading'>" + block.title + "</span><div class='content'>";
            window.links.forEach(function (link) {
                if (block.num == link.block) {
                    cellString += "<a href='" + link.href + "'>" + link.name + "</a><br>";
                }

            }, this);
            cellString += "</div></div>";

        }
        if (block.type == "search") {
            cellString += "<div class='sqr' id='search-sqr'><span class='heading'>" + block.title + "</span><div class='content'>";
            cellString += "<input id='search-input' type='text' autocomplete='off'>";
        }

        cellString += "</div>";
    }, this);
    cellString += "</div>";
    $("#cell").append(cellString);
}

function background() {
    var tempBackgroundString = "";

    switch (cfg.background.type.toLowerCase()) {
        case "video":
            tempBackgroundString = '<video autoplay loop id="bgvid"><source src="assets/' + cfg.background.info + '" type="video/' + cfg.background.info.substr(1 + cfg.background.info.lastIndexOf('.')) + '"></video>';
            break;
        case "colour":
            var $bgimage = $("#bgimage");
            $bgimage.css({"background-color": cfg.background.info});
            $bgimage.css(cfg.background.css);
            break;
        default:
            $("body").css({"background-image": cfg.background.info});
    }

    if (tempBackgroundString) {
        $("body").append(tempBackgroundString);
        $("#bgvid").css(cfg.background.css);
    }
}

$(document).ready(function () {
    document.title = cfg.misc.title;

    setupBlocks();
    background();

    $(".sqr").mouseenter(expand).mouseleave(contract);
    $(document).keydown(function (e) {
        if (e.keyCode == 9) { //TAB
            var $search = $("#search-input");
            var $search_sqr = $("#search-sqr");

            $search_sqr.mouseenter(); //Call Expand()
            $search.focus();
            $search.blur(function () {
                $search_sqr.mouseleave();
            });
            e.preventDefault();
        }
    });


    //$("a").css(cfg.style.link);
    //$("span").css(cfg.style.heading);
    //$("#search-input").css(cfg.style.search)
});