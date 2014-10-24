APP_SECRET = Meteor.settings.APP_SECRET;
ACCESS_TOKEN = APP_ID + "|" + APP_SECRET;

// documents look like:
// { decisionSlug: (...), choiceSlug: (...), linkObjectId: (...) }
LinkObjectIds = new Meteor.Collection("linkObjectIds");

Meteor.startup(function () {
  console.log("Storing LinkObjectIds");
  _.each(vwf.decisions, function (decision) {
    _.each(decision.choices, function (choice) {
      if (LinkObjectIds.findOne({
        decisionSlug: decision.slug,
        choiceSlug: choice.slug
      }))
        return;

      var url = "http://votesf.meteor.com/" + decision.slug + "/" + choice.slug;
      var linkObjectId = HTTP.get("https://graph.facebook.com/v2.1/", {
        params: {
          id: url,
          access_token: ACCESS_TOKEN
        }
      }).data.og_object.id;

      var doc = {
        decisionSlug: decision.slug,
        choiceSlug: choice.slug,
        linkObjectId: linkObjectId
      };
      console.log("Adding " + doc);
      LinkObjectIds.insert(doc);
    });
  });

  console.log("done");
});

Meteor.methods({
  votesForUser: function (fbId) {
    var batches = [[]];
    _.each(vwf.decisions, function (decision) {
      _.each(decision.choices, function (choice) {
        var linkObjectId = LinkObjectIds.findOne({
          decisionSlug: decision.slug,
          choiceSlug: choice.slug
        }).linkObjectId;

        if (batches[batches.length-1].length === 50)
          batches.push([]);
        batches[batches.length-1].push({
          method: "GET",
          relative_url: linkObjectId + "/likes"
        });
      });
    });

    var likes = [];

    _.each(batches, function (batch) {
      var batchResult = HTTP.post(
        "https://graph.facebook.com/", {
          params: {
	    access_token: ACCESS_TOKEN,
            batch: JSON.stringify(batch)
          }
        }).data;

      _.each(batchResult, function (result) {
        likes.push(JSON.parse(result.body).data);
      });
    });

    var result = {};
    _.each(vwf.decisions, function (decision) {
      result[decision.slug] = {};
      _.each(decision.choices, function (choice) {
        var likesForChoice = likes.shift();
        var didUserLikeUrl = _.contains(_.pluck(likesForChoice, 'id'), fbId + "");

        if (didUserLikeUrl) {
          if (!result[decision.slug].votes)
            result[decision.slug].votes = [];
          result[decision.slug].votes.push(choice.slug);
        }
      });
    });

    return result;
  }
});
