APP_ID = Meteor.absoluteUrl().match(/localhost/)
	? '357536554423102'
	: '350286778481413';

// {_id: fbId, decisions: {slug: comment}}
Comments = new Meteor.Collection("comments");

// If you ever want to make this is read-only, just change
// true to false below.
Comments.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return false;
  }
});
