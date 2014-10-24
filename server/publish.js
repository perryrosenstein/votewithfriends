Meteor.publish("commentsForUser", function (fbId) {
  return Comments.find(fbId);
});
