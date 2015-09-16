startpage
====

![example screenshot](http://i.imgur.com/Rof7csF.png)

![example screenshot expanded](http://i.imgur.com/1xlJZfh.png)


<br>

##### Usage
The easiest way to make changes is by editing _config.json_ and _index.html_.


Essential options are changed in the files _config.json_, _links.js_ and _commands.js_

<br>
###### JSON Bool
| attribute    | Description                                        |
| ------------ | :--------------------------------------------------: |
| borders      | if true, enables borders on top and bottom                    |
| alwaysopen   | if true, makes all squares open on load                       |
| mascot       | if true, enables image in the bottom right hand corner        |
| uppercase    | if true, makes all text in cells to be uppercase              |
| background   | directory to background file                         |
| opacity      | opacity of background layer |
| title        | tab title |
| command_prefix | prefix used to enter subcommands |
| useLinkJs     | Use js files to create elements (default on)|


###### background_type 
| background_type | description |
|--------------| :-------------------------------:|
| mp4 | mp4 video file |
| webm | webm video file |
| ogg | ogg video file |
| clr | colour value |
| img | image file (default)|


_ref_ can take either an URL or the path to a local image.

<br>


##### Adding links

###### JS
To add/remove a square, open _links.js_ and copy/create a new section of code and name it's parameters correctly
for example
```
blockArr.push({
	title:			"content", //Title Name
	type:			"link", //Type of block
	num:			"1" //Order Placement
});
```

There are two types of blocks, _link_ and _search_.
Only one block can have proper search functionality/style.

To add links to the block, copy/create a new section of code and name it's parameters correctly.
for example
```
linksArr.push({
	name:			"/a/", //Title Name
	href:			"http://boards.4chan.org/a/", //destination
    lang:			"", //Language (Optional)
	media:			[[]], //Media (Optional)
	rel:			[[]], //rel (Optional)
	block:			1 //Block to appear in
});
```

###### HTML
To add/remove a square just add/remove a _div .sqr_ within _div #cell_.<br>
Keep the structure like this:
```
<div class="sqr">
    <span>HEADING</span>
    <div class="content">
        <a href="URL">LINK TITLE</a><br>
        <a href="URL">LINK TITLE</a><br>
        ...
        <a href="URL">LINK TITLE</a>
    </div>
</div>
```

<br>
###### search
```
-h      open search help (-- and /? are also accepted)
-g      google
-b      bing
-y      youtube
-d      duckduckgo
-n      niconico
-p      pixiv
gt      github
-w      wikipedia
go      direct url
```

###### commands
```
>>        open command help
>>df      define (google)
>>qr      scan qr
>>ri      reverse image
```


The following example will search for _github_ using _DuckDuckGo_:
```
-d github
```
If an invalid search option or none at all is specified, The first entry in the search array is used.
For danbooru, use underscores (_) for tags with more than one word and separate multiple tags with space (e.g.: school_uniform 1girl).

###### adding commands

There are three types of commands, search commands, subcommands and help commands (which open menus listing commands)
```
searchArr.push({
	name:			"google", //Name of search
	command:		"-g", //comand
	url: 			"https://www.google.com/#q=", //url to query page
	replaceChars: 	[[" ", "_"]], //Charcters to replace in url
	bmPrefix:		"https://www.google.com/#q=" //Prefix used on bookmarks, makes sence on diverse networks
	bookmark:		[["hideki kamiya", "神谷英樹"]] //Multi-Dimensional array of bookmarks
});
```

```
commandArr.push({
	name:			"scan qr", //Name of command
	command:		"qr", //comand
	url: 			"http://zxing.org/w/decode?u=", //url to destination
	replaceChars: 	[[]], //Charcters to replace
	bmPrefix:		"" //Prefix used on bookmark
	bookmark:		[[]] Multi-Dimensional array of bookmarks
});
```

More character replacements can be used with more arrays or for bookmark entries
```
[["_"," "],["%20"," "]]
```

###### adding bookmark

Bookmarks are preset queries that can be used to go to a direct url from a simple term. These are checked for last, and are not triggered if a search/command has been triggered

```
bookArr.push({
	command:		"github",
	url:			"https://github.com/"
})
```



#### TODO

* Cleanup Code
* Optimise
* Consider using objects instead of arrays for config so that they can be more easily implemented

Master: https://github.com/yukisuki/startpage
Fork: https://github.com/Scrxtchy/startpage