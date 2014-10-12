Template.connect.rendered = function() {
	/* Vertically align the content */
	var containerHeight = $('.home-container').height();
	var screenHeight = $(window).height();
	$('.home-container').css('margin-top', (screenHeight - containerHeight) / 2);
	
	$("#connect-with-facebook").click(function() {
		FB.login(function(response) {
		   if (response.authResponse) {
				window.location.href = '/ballot/' + response.authResponse.userID;		
		   } else {
             alert('Login failed. Please try again.');
		   }
		 });
	});
};