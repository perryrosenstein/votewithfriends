Template.connect.rendered = function() {
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