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