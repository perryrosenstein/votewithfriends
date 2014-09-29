Router.map(function() {
  this.route('home', {path: '/'});

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
	  $('meta[property="og:image"]').attr('content', decision.choices[0].photo);	
	  $('')
	  return decision;
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
	
	  return decision;
	}
  });

});