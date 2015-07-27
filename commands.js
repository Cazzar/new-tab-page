var searchArr = [];
var commandArr= [];
var helpArr =	[];

searchArr.push({
	name:			"google",
	command:		"-g",
	url:			"https://www.google.com/#q=",
	replaceChars: 	[[" ", "+"]]
});

searchArr.push({
	name:			"youtube",
	command:		"-y",
	url: 			"https://www.youtube.com/results?search_query=",
	replaceChars: 	[[" ", "+"]]
});

searchArr.push({
	name:			"niconico",
	command:		"-n",
	url: 			"http://www.nicovideo.jp/search/",
	replaceChars: 	[[" ", "%20"]]
});

searchArr.push({
	name:			"pixiv",
	command:		"-p",
	url: 			"http://www.pixiv.net/search.php?s_mode=s_tag&word=",
	replaceChars: 	[[" ", "%20"]]
});

searchArr.push({
	name:			"github",
	command:		"gt",
	url: 			"https://github.com/search?q=",
	replaceChars: 	[[" ", "+"]]
});

searchArr.push({
	name:			"wikipedia",
	command:		"-w",
	url: 			"https://en.wikipedia.org/w/index.php?search=",
	replaceChars: 	[[]]
});


searchArr.push({
	name:			"direct url",
	command:		"go",
	url: 			"",
	replaceChars: 	[[]]
});

/*Template

searchArr.push({
	name:			"",
	command:		"",
	url: 			"",
	replaceChars: 	[[" ", "_"]]
});

*/

commandArr.push({
	name:			"define",
	command:		"df",
	url: 			"https://www.google.com/?q=define+",
	replaceChars: 	[[" ", "+"]]
});

commandArr.push({
	name:			"scan qr",
	command:		"qr",
	url: 			"http://zxing.org/w/decode?u=",
	replaceChars: 	[[]] //unknown yet
});

commandArr.push({
	name:			"reverse image",
	command:		"ri",
	url: 			"https://www.google.com/searchbyimage?image_url=",
	replaceChars: 	[[]] //unknown
});

/*Template

commandArr.push({
	name:			"",
	command:		"",
	url: 			"",
	replaceChars: 	[[" ", "_"]]
});

*/

helpArr.push({
	command: 		"-h",
	type: 			"search"
});

helpArr.push({
	command:		"/?",
	type:			"search"
});

helpArr.push({
	command:		"--",
	type:			"search"
});

helpArr.push({
	command:		">>",
	type:			"command"
});

/*Template

helpArr.push({
	command:		"",
	type:			""
});

*/