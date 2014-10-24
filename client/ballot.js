Template.ballot.created = function () {
  var self = this;

  Meteor.subscribe("commentsForUser", self.data.fbid);

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

var getCurrentFbId = function () {
  FB.getLoginStatus(function (response) {
    Session.set("loggedInFbId", response.authResponse.userID);
  });
};

Meteor.startup(function () {
  if (window.fbInited) {
    getCurrentFbId();
  } else {
    var oldFbAsyncInit = window.fbAsyncInit;
    window.fbAsyncInit = function () {
      oldFbAsyncInit();
      getCurrentFbId();
    };
  }
});

Template.ballot.events({
  'click .editComment': function () {
    Session.set("editingCommentForDecision", this.slug);
  },

  'click .saveComment': function (evt, tmpl) {
    if (!Comments.findOne()) {
      Comments.insert({_id: Template.parentData(1).fbid});
    }

    var set = {$set: {}};
    set.$set["decisions." + this.slug] = tmpl.find(".editComment-" + this.slug).value;
    Comments.update(Comments.findOne()._id, set);
    Session.set("editingCommentForDecision", null);
  }
});

Template.ballot.helpers({
  isMe: function () {
    return Template.instance().data.fbid === Session.get("loggedInFbId");
  },

  editingComment: function () {
    return Session.get("editingCommentForDecision") === this.slug;
  },

  ballot: function () {
    var ballot = Session.get("ballotData");
    if (!ballot)
      return null;

    // constuct a clone of `vwf.decisions` that has comments added to it,
    // and only the choices that were actually voted for
    var result = {decisions: _.map(EJSON.clone(vwf.decisions), function (decision) {
      var decisionWithComment = _.extend({}, decision);
      if (Comments.findOne()) {
        decisionWithComment = _.extend(decisionWithComment, {
          comment: Comments.findOne().decisions[decision.slug]
        });
      }

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
