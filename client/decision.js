var indexForSlug = function (currentSlug) {
	var currentIndex;
	
	_.find(vwf.decisions, function (entry, index) { 
	  if (entry.slug === currentSlug) {
		currentIndex = index;
		return true;
	  } else {
		return false;
  	  }
	});
	
	return currentIndex;
}

Template.decision.helpers({
  appId: function () {
    return APP_ID;
  },
  prevDecision: function () {
	var currentIndex = indexForSlug(this.slug);
	
	if (currentIndex === 0)
	  return null;
	else
	  return vwf.decisions[currentIndex-1];
  },

  nextDecision: function () {
	var currentIndex = indexForSlug(this.slug);
	
	if (currentIndex === vwf.decisions.length-1)
	  return null;
	else
	  return vwf.decisions[currentIndex+1];
  }

})

Template.decision.rendered = function () {
  this.autorun(function () {
    // Register a reactive dependency on the data context (which is
    // where we store the current decision being voted on). Learn more
    // about "transparent reactive programming" at
    // http://docs.meteor.com/#tracker
    Template.currentData();

    // Since we load the Facebook SDK asynchronously, it may not yet
    // be defined
    if (typeof FB !== 'undefined') {
      // http://stackoverflow.com/a/10745728/1352190
      FB.XFBML.parse();
    }
  });
};
