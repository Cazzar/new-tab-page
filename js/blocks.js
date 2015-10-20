window.blocks = [];
window.links = [];

/* TEMPLATE

blocks.push({
     title:			"",
     type:			"link", //link, search
     num:			"1"
});
 */


blocks.push({
    title: "content",
    type: "link",
    num: "1"
});

blocks.push({
    title: "images",
    type: "link",
    num: "2"
});

blocks.push({
    title: "anime",
    type: "link",
    num: "3"
});

blocks.push({
    title: "misc",
    type: "link",
    num: "4"
});

blocks.push({
    title: "search",
    type: "search",
    num: "5"
});

//Block 1
links.push({
    name: "facebook",
    href: "https://facebook.com/",
    block: 1
});

links.push({
    name: "twitter",
    href: "http://tweetdeck.twitter.com/",
    block: 1
});

links.push({
    name: "ozfur",
    href: "http://ozzyfurocity.net/",
    block: 1
});

links.push({
    name: "github",
    href: "https://github.com/cazzar",
    block: 1
});

links.push({
    name: "youtube",
    href: "https://youtube.com/",
    block: 1
});

links.push({
    name: "ipt",
    href: "http://iptorrents.me",
    block: 1
});


//Block 2

links.push({
    name: "danbooru",
    href: "http://www.donmai.us/",
    block: 2
});

links.push({
    name: "konachan",
    href: "http://www.konachan.com/",
    block: 2
});


links.push({
    name: "yande.re",
    href: "http://yande.re/",
    block: 2
});

links.push({
    name: "vectorbooru",
    href: "http://vector.booru.org/",
    block: 2
});

links.push({
    name: "zerochan",
    href: "http://zerochan.net/",
    block: 2
});

links.push({
    name: "pixiv",
    href: "http://www.pixiv.net/",
    block: 2
});


//Block 3
links.push({
    name: "horriblesubs",
    href: "http://horriblesubs.info/",
    block: 3
});

links.push({
    name: "myanimelist",
    href: "http://myanimelist.net/",
    block: 3
});

links.push({
    name: "anichart",
    href: "http://anichart.net/",
    block: 3
});

links.push({
    name: "anidb",
    href: "http://anidb.net/",
    block: 3
});

links.push({
    name: "nyaa.se",
    href: "http://nyaa.se/",
    block: 3
});

links.push({
    name: "bakabt",
    href: "http://bakabt.me/",
    block: 3
});

links.push({
    name: "kazamatsuri",
    href: "http://kazamatsuri.org/",
    block: 3
});

links.push({
    name: "mikudb",
    href: "http://mikudb.moe",
    block: 4
});

links.push({
    name: "vocadb",
    href: "https://vocadb.net/",
    block: 4
});

links.push({
    name: "gmail",
    href: "https://inbox.google.com",
    block: 4
});

links.push({
    name: "fedemail",
    href: "http://federation.edu.au/office365",
    block: 4
});


/* Template

links.push({
     name:			"",
     href:			""
     lang:			"",
     media:			[[]],
     rel:			[[]],
     block:			1
});
 */


var searchEngines = [];
var commands= [];
var helpCommands =	[];
var bookmarks =	[];

searchEngines.push({
    name:			"google",
    command:		"-g",
    url:			"https://www.google.com/#q=",
    replaceChars: 	[[" ", "+"]],
    bmPrefix:		"",
    bookmark:		[[]]
});

searchEngines.push({
    name:			"youtube",
    command:		"-y",
    url: 			"https://www.youtube.com/results?search_query=",
    replaceChars: 	[[" ", "+"]],
    bmPrefix:		"",
    bookmark:		[[]]
});

searchEngines.push({
    name:			"niconico",
    command:		"-n",
    url: 			"http://www.nicovideo.jp/search/",
    replaceChars: 	[[" ", "%20"]],
    bmPrefix:		"",
    bookmark:		[[]]
});

searchEngines.push({
    name:			"pixiv",
    command:		"-p",
    url: 			"http://www.pixiv.net/search.php?s_mode=s_tag&word=",
    replaceChars: 	[[" ", "%20"]],
    bmPrefix:		"",
    bookmark:		[[]]
});

searchEngines.push({
    name:			"github",
    command:		"gt",
    url: 			"https://github.com/search?q=",
    replaceChars: 	[[" ", "+"]],
    bmPrefix:		"https://github.com/",
    bookmark:		[["youtube-dl", "rg3/youtube-dl"], ["fuck", "nvbn/thefuck"]]
});

searchEngines.push({
    name:			"wikipedia",
    command:		"-w",
    url: 			"https://en.wikipedia.org/w/index.php?search=",
    replaceChars: 	[[]],
    bmPrefix:		"",
    bookmark:		[[]]
});

/*Template

 searchEngines.push({
 name:			"",
 command:		"",
 url: 			"",
 replaceChars: 	[[" ", "_"]],
 bmPrefix:		"",
 bookmark:		[[]]
 });

 */

commands.push({
    name:			"define",
    command:		"df",
    url: 			"https://www.google.com/?q=define+",
    replaceChars: 	[[" ", "+"]],
    bmPrefix:		"",
    bookmark:		[[]]
});

commands.push({
    name:			"scan qr",
    command:		"qr",
    url: 			"http://zxing.org/w/decode?u=",
    replaceChars: 	[[]] //unknown yet
});

commands.push({
    name:			"reverse image",
    command:		"ri",
    url: 			"https://www.google.com/searchbyimage?image_url=",
    replaceChars: 	[[]] //unknown
});

commands.push({
    name:			"direct url",
    command:		"go",
    url: 			"",
    replaceChars: 	[[]],
    bmPrefix:		"",
    bookmark:		[[]]
});

/*Template

 commands.push({
 name:			"",
 command:		"",
 url: 			"",
 replaceChars: 	[[" ", "_"]],
 bmPrefix:		"",
 bookmark:		[[]]
 });

 */

bookmarks.push({
    command:		"4ch",
    url:			"https://4chan.org/"
});

/*Template


 bookmarks.push({
 command:		"",
 url:			""
 })

 */

helpCommands.push({
    command: 		"-h",
    type: 			"search"
});

helpCommands.push({
    command:		"-?",
    type:			"search"
});

helpCommands.push({
    command:		"--",
    type:			"search"
});

helpCommands.push({
    command:		">>",
    type:			"command"
});

/*Template

 helpCommands.push({
 command:		"",
 type:			""
 });

 */