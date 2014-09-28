vwf = {
	currentDecision: 0,
	decisions: [
		{ 
			title: 'Governor',
			slug: 'governor',
			type: 'candidate',
			ballotpedia_url: 'California_Gubernatorial_election,_2014',
			choices: [
				{
					title: 'I support Jerry Brown for Governor',
					name: 'Jerry Brown',
					slug: 'jerry-brown',
					photo: 'jerry-brown.png',
					party: 'Democrat'
				},
				{
					title: 'I support Neel Kashkari for Governor',
					name: 'Neel Kashkari',
					slug: 'neel-kashkari',
					photo: 'neel-kashkari.png',
					party: 'Republican'
				}
			]
		},
		{ 
			title: 'Lieutenant Governor',
			slug: 'lt-governor',
			type: 'candidate',
			ballotpedia_url: 'California_Lieutenant_Gubernatorial_election,_2014',
			choices: [
				{
					name: 'Gavin Newsom',
					slug: 'gavin-newsom',
					photo: 'gavin-newsom.png',
					party: 'Democrat'
				},
				{
					name: 'Ron Nehring',
					slug: 'ron-nehring',
					photo: 'ron-nehring.png',
					party: 'Republican'				
				}
			]
		},
		{
			title: 'Proposition 1, Water Bond',
			slug: 'prop-1',
			type: 'proposition',
			ballotpedia_slug: 'California_Proposition_1,_Water_Bond_(2014)',
			choices: [{
				name: 'Yes',
				slug: 'yes'
			}, {
				name: 'No',
				slug: 'no'
			}]
		}		
	]
}
