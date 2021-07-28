# may_logger's live stream chatbox  (streamlabs required)

## How to install

### Step 1

Login to your <a href="http://streamlabs.com/dashboard#/chatbox" target="_blank">streamlabs chatbox</a>

### Step 2

Find "Enable custom html/css" and make sure you enable it.

### Step 3

Copy and paste this code below include html, css, js:

HTML

```
<!-- item will be appened to this layout -->
<div id="log" class="sl__chat__layout">
</div>

<!-- chat item -->
<script type="text/template" id="chatlist_item">
	<div class="slider">
    <div data-from="{from}" data-id="{messageId}" class="chat-box start" data-background="{color}">
      <span class="meta">
        <span class="badges"></span><span class="name">{from}</span>
      </span>

      <span class="message">
        {message}
      </span>
    </div>
  </div>
</script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
```

CSS
```
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);

:root {
/*   dark theme */
/*   --text-color: rgba(255,255,255,.95);
  --box-color: rgba(0,0,0,.75); */

/*   Light theme */
  --text-color: rgba(0,0,0,.95);
  --box-color: rgba(255,255,255,.9);

/* emote bounce delay */
  --start: .1s;
  --delay: .03s;
}

* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow: hidden;
  background: transparent;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang TC','Noto Sans TC', sans-serif, "Apple Color Emoji";
  font-weight: 400;
  font-size: {font_size};
  line-height: 1.7;
  color: var(--text-color);
}

/* all messages group */
#log {
    display: block;
    position: absolute;
    bottom: .5em;
    left: 0;
    padding: 0;
    width: 100%;
}

/* 單一聊天 */

.slider {
    position: relative;
    transition: opacity .2s;
}
.slider:after {
    content: "";
    display: table;
    clear: both;
}

#log>div .chat-box {
  float: right;
  clear: right;
  background: var(--box-color);
  max-width: calc( 8em + 1.2em);
  min-width: 0;
  /* height: 0; */
  margin: .5em .5em 0;
  overflow: hidden;
  border-radius: 5px;
  /* zoom effect initial */
  transform-origin: 100% 100%;
  transform: scale(1);
  transition: .3s cubic-bezier(.2,1.5,.5,1);
/*   transition: .3s ease-out; */
  transition-delay: .5s;
  /* fadein effect */
  animation: fadeOut 0.5s ease-in-out {message_hide_delay} forwards;
  -webkit-animation: fadeOut 0.5s ease-in-out {message_hide_delay} forwards;
}

#log>div .chat-box.odd {
  max-width: calc( 7em + 1.2em);
}


.colon {
  display: none;
}

#log>div.deleted {
  visibility: hidden;
}

/* 最後發文聊天縮放 */
#log>div .chat-box.start {
  transform: scale(1.7);
  max-width: calc( 100%/1.7 - .5em );
  margin-top: 2.5em;
}

/* 表情符號 */
#log .emote {
	display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-top: -.2em;
  padding: .4em .2em;
  padding-top: 0;
  position: relative;
}

#log .emote img {
    display: block;
    height: 1em;
    opacity: 0;
}

/* 對話框裡的排版 */
#log .message,#log .meta {
    vertical-align: top;
    display: block;
    padding: 0 .5em .3em;
}

#log .meta {
    position: relative;
    top: .1em;
    padding: .2em .7em;
  	display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    background: rgba(0,0,0,0);
    font-size: .75em;
    font-weight: bold;
}

#log .message {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  line-height: 1.3;
  filter: drop-shadow(1px 1px 0 rgba(0,0,0,.25));
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding: 1.5em .5em 0;
  margin: -1.7em 0 .25em;
  overflow: hidden;
  position: relative;
}

#log .chat-box.start .messsage {
    -webkit-line-clamp: none;
    white-space: nowrap;
    text-overflow: ellipsis;
}

#log .message img,
#log .message .emote {
  vertical-align: bottom;
}

.badge {
  display: inline-block;
  margin-right: 0.2em;
  position: relative;
  height: 1em;
  width: 1em;
  vertical-align: middle;
  top: -0.1em;
  image-rendering: pixelated;
  border-radius: 3px;
}

.name {
  font-weight: 500;
  opacity: .75;
}

#log>div[data-order="1"] { 
  opacity: 0.1;
}
#log>div[data-order="2"] { 
  opacity: 0.3;
}
#log>div[data-order="3"] { 
  opacity: 0.5;
}
#log>div[data-order="4"] { 
  opacity: 0.7;
}
#log>div[data-order="5"] { 
  opacity: 0.9;
}
```

JS
```
$( document ).ready()

window.odd = 0;

function hex2rgb(hexcolor){
  	var r = parseInt(hexcolor.substr(1,2),16);
    var g = parseInt(hexcolor.substr(3,2),16);
    var b = parseInt(hexcolor.substr(5,2),16);
  	return [r,g,b]
}

function rgb2hsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }    h /= 6;
  }  
  return [h,s,l];
}

function hex2hsl(hex) {
  return rgb2hsl(...hex2rgb(hex));
}

function hsl2color(h, s, l, a=1){ return "hsla(" + parseInt(h*360) + ", " + parseInt(s*100) + "%, " + parseInt(l * 100) + "%," + a +")"; }

function getContrastYIQ(hexcolor){
	var [r,g,b] = hex2rgb(hexcolor);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 100) ? 'black' : 'white';
}

function darken(h, s, l, x=0.5, move=0){ return [h+move/360, s*1.1, l * x]; }
function lighten(h, s, l, x=0.5, move=0){ return [h+move/360, s*0.8, 1-(1-l)* x]; }

// Please use event listeners to run functions.
document.addEventListener('onLoad', function(obj) {
	// obj will be empty for chat widget
	// this will fire only once when the widget loads
});

document.addEventListener('onEventReceived', function(obj) {

var $log = $('#log>div');
var totallogs = $log.length;

$log.each(function(index){
  $(this).attr( "data-order", Math.max(1, 8 - (totallogs - index - 1)) );
});
  
  var $this = $('#log>div:last-child .chat-box');
  $this.each(function( index ) {
    var hex = $(this).data("background");
    var colorStyle = getContrastYIQ(hex);
    var backgroundStyle = 
        (colorStyle == "white") ?
        hsl2color(...darken(...hex2hsl(hex), 0.5,10),.85) :
        hsl2color(...lighten(...hex2hsl(hex), 0.5, 10));
    var gradient =
        (colorStyle == "white") ?
        "linear-gradient( to right," + backgroundStyle + "," + hsl2color(...darken(...hex2hsl(hex), 0.85,-5)) + ")" :
        "linear-gradient( to right," + backgroundStyle + "," + hsl2color(...darken(...hex2hsl(hex), 1,5),.85) + ")";
    $this.css( "background-image" , gradient  ).css( "color" , colorStyle ).css("background-color","transparent");
    if ( ++window.odd % 2 == 1 ) { $this.addClass("odd") };
  });
  $('#log>div .emote').removeClass('bounce animated');
  $('#log>div:last-child .emote').each(function( index ) {
    // $(this).attr('style', $(this).attr('style').replace('1.0','3.0')).addClass('bounce animated');
    $(this).attr('style', $(this).attr('style').replace('1.0','3.0'));
	});
  $('#log>div.slider:last-child').css({
   		'opacity' : '0','display' : 'none','right' : '-25%'
	}).slideDown(150).delay(100).animate({right:0,opacity:1},150,function(){
      $this.removeClass('start');
      $(this).css( 'opacity' ,'');
  });
  
if ( $log.length > 8 ) {
    $log.slice(0, totallogs - 8 ).animate({ opacity: 0 }, 150, function(){
      $(this).remove();
    });
  };
    
});
```

### Step 4

Click "save settings" button.

### Step 5

Find and copy the "Widget URL" at the top of page.
Go OBS, create a browser source with "Widget URL".
I highly recommend setting the "browser soruce" size to 800 x 1080 and placing it on the right edge of the screen canvas.
