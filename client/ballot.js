Template.ballot.created = function () {
	var self = this;
	self.ballotData = new ReactiveVar(null);

	Meteor.call("votesForUser", self.data.fbid, function (err, ballotData) {
		if (err) {
			alert(err.message);
		} else {
			self.ballotData.set(ballotData);
		}
	});
};

Template.ballot.helpers({
	ballot: function () {
		var ballot = Template.instance().ballotData.get();
		return ballot && JSON.stringify(ballot);
	}
})
