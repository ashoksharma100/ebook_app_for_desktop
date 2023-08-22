const MASTER_DB = {
	
	CONFIG: {
		MAX_INPUT: 100,						// max length of typing
		MAX_ATTEMPT_ANS: 2,					// attempts for showing answer button
		INPUT_FILTER_STATUS: false,
		INPUT_FILTER: [84, 116, 70, 102],	//T AND F
		
		INPUT_TRANSFORM: 'default',		// uppercase | lowercase | default
		INPUT_TEXT_CODE: '[<>]',

		FEEDBACK_TIME: 2500
	},
	
	TITLE: '',
	INSTRUCTION: 'Match the columns.',
	QUESTIONS: [
		{
			feedback: {
				positive: '<img src="img/correct_Img.gif" alt="" />',
				negative: '<img src="img/incorrect_Img.gif" alt="" />'
			}
		}
	],
	
	ANSWERS: {
		INSTRUCTION: 'Answers'
	}
}

var tempJsonObj =
{
	"LeftHeading"  : "Column A",
	"RightHeading" : "Column B",
     "Left": [
       "If I met a crow,",
       "If I met a lamb,",
       "If I met a dove,",
       "If I met a dog,",
       "If I met a cat,"
    ],
    "Right": [
		"I should say,—‘Coo-Coo!’",
		"I should say,—‘Miaow!’",
		"I should say,—‘Baa-Baa!’",
		"I should say,—‘Caw-Caw!’",
		"I should say,—‘Bow-Wow!’"
		
    ],
    "Answer": [
        "l1_r4",
        "l2_r3",
        "l3_r1",
        "l4_r5",
        "l5_r2"
    ],
    "text": "Click on an option in Column A and then click on the correct answer in Column B.<br /> <br /> After completing, click on Submit.<br /> <br />To check answer, click on Show Answer."
}
var button_text={
	"1" : "Submit",
	"2" : "Show Answers"
}
var language_code={
 "1":"0"//0 for english and 1 for hindi
}
var information_text={
	"1": "Information",
	"2": "Audio"
}