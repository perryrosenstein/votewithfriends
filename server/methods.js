APP_SECRET = Meteor.settings.APP_SECRET;
ACCESS_TOKEN = APP_ID + "|" + APP_SECRET;

didUserLikeUrl = function (fbId, url) {
  var linkObjectId = HTTP.get("https://graph.facebook.com/v2.1/", {
    params: {
      id: url,
      access_token: ACCESS_TOKEN
    }
  }).data.og_object.id;

  var likes = HTTP.get(
    "https://graph.facebook.com/v2.1/" + linkObjectId + "/likes", {
      params: {
	access_token: ACCESS_TOKEN
      }
    }).data;

  // XXX deal with paging

  return _.contains(_.pluck(likes.data, 'id'), fbId + "");
};

userCommentOnUrl = function (fbId, url) {
  var linkObjectId = HTTP.get("https://graph.facebook.com/v2.1/", {
    params: {
      id: url,
      access_token: ACCESS_TOKEN
    }
  }).data.og_object.id;

  var comments = HTTP.get(
    "https://graph.facebook.com/v2.1/" + linkObjectId + "/comments", {
      params: {
	access_token: ACCESS_TOKEN
      }
    }).data;

  // XXX deal with paging

  var commentData = _.find(comments.data, function(comment) {
    return comment.from.id === fbId + "";
  });
  return commentData && commentData.message;
}

Meteor.methods({
  votesForUser: function (fbId) {
    // XXX rewrite to use FB Graph batch calls
    var result = {};
    _.each(vwf.decisions, function (decision) {
      var decisionUrl = "http://votesf.meteor.com/" +
	    decision.slug;

      result[decision.slug] = {};

      var comment = userCommentOnUrl(fbId, decisionUrl);
      if (comment) {
	result[decision.slug].comment = comment;
      }

      _.each(decision.choices, function (choice) {
	var choiceUrl = decisionUrl + "/" + choice.slug;
	if (didUserLikeUrl(fbId, choiceUrl)) {
	  if (!result[decision.slug].votes)
	    result[decision.slug].votes = [];
	  result[decision.slug].votes.push(choice.slug);
	}
      });
    });

    return result;
  }
});
