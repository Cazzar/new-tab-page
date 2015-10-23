window.searchEngines = [];
window.commands      = [];
window.helpCommands  = [];
window.bookmarks     = [];

searchEngines.push({
    name:           "google",
    command:        "-g",
    url:            "https://www.google.com/#q=",
    replaceChars:   [[" ", "+"]],
    bmPrefix:       "",
    bookmark:       [[]]
});

searchEngines.push({
    name:           "bing",
    command:        "-b",
    url:            "https://www.bing.com/?q=",
    replaceChars:   [[" ", "+"]["#", "%23"]],
    bmPrefix:       "",
    bookmark:       [[]]
});

searchEngines.push({
    name:           "youtube",
    command:        "-y",
    url:            "https://www.youtube.com/results?search_query=",
    replaceChars:   [[" ", "+"]],
    bmPrefix:       "",
    bookmark:       [[]]
});

searchEngines.push({
    name:           "duckduckgo",
    command:        "-d",
    url:            "https://duckduckgo.com/?q=",
    replaceChars:   [[" ", "+"]],
    bmPrefix:       "",
    bookmark:       [[]]
});

searchEngines.push({
    name:           "niconico",
    command:        "-n",
    url:            "http://www.nicovideo.jp/search/",
    replaceChars:   [[" ", "%20"]],
    bmPrefix:       "",
    bookmark:       [[]]
});

searchEngines.push({
    name:           "pixiv",
    command:        "-p",
    url:            "http://www.pixiv.net/search.php?s_mode=s_tag&word=",
    replaceChars:   [[" ", "%20"]],
    bmPrefix:       "",
    bookmark:       [[]]
});

searchEngines.push({
    name:           "github",
    command:        "gt",
    url:            "https://github.com/search?q=",
    replaceChars:   [[" ", "+"]],
    bmPrefix:       "https://github.com/",
    bookmark:       [["youtube-dl", "rg3/youtube-dl"], ["fuck", "nvbn/thefuck"]]
});

searchEngines.push({
    name:           "wikipedia",
    command:        "-w",
    url:            "https://en.wikipedia.org/w/index.php?search=",
    replaceChars:   [[]],
    bmPrefix:       "",
    bookmark:       [[]]
});

/*Template

searchEngines.push({
    name:           "",
    command:        "",
    url:            "",
    replaceChars:   [[" ", "_"]],
    bmPrefix:       "",
    bookmark:       [[]]
});

*/

commands.push({
    name:           "define",
    command:        "df",
    url:            "https://www.google.com/?q=define+",
    replaceChars:   [[" ", "+"]],
    bmPrefix:       "",
    bookmark:       [[]]
});

commands.push({
    name:           "scan qr",
    command:        "qr",
    url:            "http://zxing.org/w/decode?u=",
    replaceChars:   [[]] //unknown yet
});

commands.push({
    name:           "reverse image",
    command:        "ri",
    url:            "https://www.google.com/searchbyimage?image_url=",
    replaceChars:   [[]] //unknown
});

commands.push({
    name:           "direct url",
    command:        "go",
    url:            "",
    replaceChars:   [[]],
    bmPrefix:       "",
    bookmark:       [[]]
});

/*Template

commands.push({
    name:           "",
    command:        "",
    url:            "",
    replaceChars:   [[" ", "_"]],
    bmPrefix:       "",
    bookmark:       [[]]
});

*/

bookmarks.push({
    command:        "4ch",
    url:            "https://4chan.org/"
})

/*Template


bookmarks.push({
    command:        "",
    url:            ""
})

*/

helpCommands.push({
    command:        "-h",
    type:           "search"
});

helpCommands.push({
    command:        "/?",
    type:           "search"
});

helpCommands.push({
    command:        "--",
    type:           "search"
});

helpCommands.push({
    command:        ">>",
    type:           "command"
});

/*Template

helpCommands.push({
    command:        "",
    type:           ""
});

*/