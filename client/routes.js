Router.map(function() {
  this.route('home', {path: '/'});
  this.route('connect', {path: '/connect'});

  this.route('decision', { 
    path: '/:decision',
    data: function() {
	  var decisionSlug = this.params.decision;

	  // Find 'decision' from the big decision array defined
	  // in data.js
	  var decision = _.find(vwf.decisions, function (entry) {
	    return entry.slug === decisionSlug;
	  });
	
	  if (!decision)
	    return {error: true};  
		
	  $('meta[property="og:title"]').attr('content', decision.title);
	  $('meta[property="og:url"]').attr('content', window.location.href);
	  if (decision.summary) {
		  $('meta[property="description"]').attr('content', decision.summary);	
		  $('meta[property="og:description"]').attr('content', decision.summary);		
	  }
	  return decision;
	}
  });

  this.route('guide', {
	template: 'ballot',
	path: '/guide/:firstName/:lastName/:fbid',
	data: function() {
		var ogTitle = this.params.firstName + " " + this.params.lastName + "'s Voter Guide";
		var ogImage = "https://graph.facebook.com/" + this.params.fbid + "/picture?height=400&width=400";
		var ogDescription = "See how " + this.params.firstName + " is voting in this year's elections at Vote With Friends."
		$('meta[property="og:title"]').attr('content', ogTitle);
		$('meta[property="og:image"]').attr('content', ogImage); 
		$('meta[property="og:image:width"]').attr('content', 400);
		$('meta[property="og:image:height"]').attr('content', 400);
		$('meta[property="og:url"]').attr('content', window.location.href);	
		$('meta[property="og:description"]').attr('content', ogDescription);		       
		return this.params;
	}
  });

  this.route('choice', {
	template: 'decision',
    path: '/:decision/:choice',
    data: function() {
	  var decisionSlug = this.params.decision;
	  var choiceSlug = this.params.choice;

	  // Find 'decision' and 'choice' from the big decision array defined
	  // in data.js
	  var decision = _.find(vwf.decisions, function (entry) {
	    return entry.slug === decisionSlug;
	  });
	  var choice = _.find(decision.choices, function (choiceToCheck) {
		return choiceToCheck.slug === choiceSlug;
  	  });
	  
	  if (!decision || !choice)
	    return {error: true};
	  
	  $('meta[property="og:title"]').attr('content', choice.title);
	  $('meta[property="og:url"]').attr('content', window.location.href);
	  $('meta[property="og:image"]').attr('content', window.location.origin + "/images/" + choice.photo);
	  if (decision.summary) {
		  $('meta[property="description"]').attr('content', decision.summary);	
		  $('meta[property="og:description"]').attr('content', decision.summary);		
	  }
	  return decision;
	}
  });

});
