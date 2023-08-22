const MASTER_DB = {
	
	CONFIG: {
		MAX_INPUT: 100,						// max length of typing
		MAX_ATTEMPT_ANS: 1,					// attempts for showing answer button
		INPUT_FILTER_STATUS: false,
		INPUT_FILTER: [84, 116, 70, 102],	//T AND F
		
		INPUT_TRANSFORM: 'default',		// uppercase | lowercase | default
		INPUT_TEXT_CODE: '[<>]',

		FEEDBACK_TIME: 2500
	},
	
	TITLE: '',
	INSTRUCTION: 'Fill in the blanks with a or an.',
	QUESTIONS: [
		{
			feedback: {
				positive: '<img src="img/correct_Img.gif" alt="" />',
				negative: '<img src="img/incorrect_Img.gif" alt="" />'
			},
			data: [{
				title: 'We saw [<>] eagle in the sky.',
				ans: ['an']
			}, {
				title: 'Ira had bread and [<>] egg for breakfast.',
				ans: ['an']
			}, {
				title: ' [<>] cat ran over the table.',
				ans: ['A']
			}, {
				title: 'My mother gave me [<>] bottle.',
				ans: ['a']
			}, {
				title: ' [<>] owl lives in a tree.',
				ans: ['An']
			}, {
				title: 'Chandra has [<>] colourful drum.',
				ans: ['a']
			}]
		
		}
	],
	
	ANSWERS: {
		INSTRUCTION: 'Solution'
	}
}