Template.home.rendered = function() {
  	/* Vertically align the content */
	var containerHeight = $('.home-container').height();
	var screenHeight = $(window).height();
	$('.home-container').css('margin-top', (screenHeight - containerHeight) / 2);	
};