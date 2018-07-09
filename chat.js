$( document ).ready()

// Please use event listeners to run functions.
document.addEventListener('onLoad', function(obj) {
	// obj will be empty for chat widget
	// this will fire only once when the widget loads
});

document.addEventListener('onEventReceived', function(obj) {
  $('#log>div .emote').removeClass('bounce animated infinite');
  $('#log>div:last-child .emote').each(function( index ) {
    $(this).attr('style', $(this).attr('style').replace('1.0','3.0')).addClass('bounce animated infinite');
	});
});
