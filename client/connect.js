Template.connect.rendered = function() {
  /* Vertically align the content */
  var containerHeight = $('.home-container').height();
  var screenHeight = $(window).height();
  $('.home-container').css('margin-top', (screenHeight - containerHeight) / 2);

  $("#connect-with-facebook").click(function() {
    FB.login(function(response) {
      var fbid = response.authResponse.userID;
      if (response.authResponse) {
        FB.api("/me", function (response) {
          Votes.insert({fbid: fbid, data: response});
          Router.go('/ballot/' + response.name.replace(/ /g, "-")
                    + "/" + fbid, {replaceState: true});
        });
      } else {
        alert('Login failed. Please try again.');
      }
    });
  });
};
