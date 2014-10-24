Template.connect.rendered = function() {
  /* Vertically align the content */
  var containerHeight = $('.home-container').height();
  var screenHeight = $(window).height();
  $('.home-container').css('margin-top', (screenHeight - containerHeight) / 2);

  $("#connect-with-facebook").click(function() {
    FB.login(function(response) {
      if (response.authResponse && response.authResponse.userID) {
        var fbid = response.authResponse.userID;
        FB.api("/me", function (response) {
          Votes.insert({fbid: fbid, data: response});
          Router.go('/guide/' + response.first_name.replace(/ /g, "-")
                    + response.last_name.replace(/ /g, "-")
                    + "/" + fbid, {replaceState: true});
		  console.log(response);
        });
      } else {
        alert('Login failed. Please try again.');
      }
    }, {scope: 'email'});
  });
};
