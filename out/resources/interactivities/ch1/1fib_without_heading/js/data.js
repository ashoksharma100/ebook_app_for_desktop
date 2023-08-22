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
	INSTRUCTION: 'Fill in the blanks with the correct words from the brackets.',
	QUESTIONS: [
		{
			feedback: {
				positive: '<img src="img/correct_Img.gif" alt="" />',
				negative: '<img src="img/incorrect_Img.gif" alt="" />'
			},
			data: [{
				title: 'It is [<>] (Grandpa’s/Grandma’s) birthday.',
				ans: ['Grandpa\'s']
			}, {
				title: 'Grandma, Mamma, Papa and Neha have a [<>] (gift/surprise) for him.',
				ans: ['surprise']
			}, {
				title: 'The family [<>] (cleaned/chased) Grandpa’s car.',
				ans: ['cleaned']
			}, {
				title: 'Grandpa’s car looks [<>] (old/new).',
				ans: ['new']
			}, {
				title: 'The family went for a [<>] (picnic/vacation).',
				ans: ['picnic']
			}]
		
		}
	],
	
	ANSWERS: {
		INSTRUCTION: 'Solution'
	}
}