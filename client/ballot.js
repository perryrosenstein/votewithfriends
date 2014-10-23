Template.ballot.created = function () {
  var self = this;

  if (!Session.get("ballotData")) {
    Meteor.call("votesForUser", self.data.fbid, function (err, ballotData) {
      if (err) {
	alert(err.message);
      } else {
	Session.set("ballotData", ballotData);
      }
    });
  }
};

Template.ballot.helpers({
  ballot: function () {
    var ballot = Session.get("ballotData");
    if (!ballot)
      return null;

    // constuct a clone of `vwf.decisions` that has comments added to it,
    // and only the choices that were actually voted for
    var result = {decisions: _.map(EJSON.clone(vwf.decisions), function (decision) {
      var decisionWithComment = _.extend(
        {}, decision, {comment: ballot[decision.slug].comment});

      decisionWithComment.choices = _.filter(
        decisionWithComment.choices, function (choice) {
          return _.contains(ballot[decision.slug].votes, choice.slug);
        });

      return decisionWithComment;
    })};

    console.log(result);
    return result;

  },
  actedOnDecision: function () {
    return this.comment || !_.isEmpty(this.choices);
  },
  removeDashes: function (name) {
    return name.replace(/-/g, " ");
  }
});
