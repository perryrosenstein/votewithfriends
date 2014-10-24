Votes = new Meteor.Collection("votes");
Votes.allow({
  insert: function () { return true; },
  update: function () { return false; },
  remove: function () { return false; }
});
