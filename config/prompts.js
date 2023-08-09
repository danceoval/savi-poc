


function generateBulletList(arr){
  return arr.map((item) => {
    return `* Question: ${item.question}, Answer: ${item.answer}`;
  }).join('\n');
};


function createPrompt(survey) {
	const surveyStr = generateBulletList(survey);

	const prepPrompt = `
		You are a strategy consultant at McKinsey with 10 years of experience. 
		Your goal is to suggest a relevant use case for AI that they approve of. 
		When they have approved a suggested use case, including your reasoning and any specific tools or dependencies.

		You have recieved this information from the client regarding their role, current strategic priorities, and associated challenges. 
		You have also received information on the types of data their team has access to, and their comfort with AI.

		Client Information: 

		${surveyStr}

		When suggesting a use case, make sure the client agrees to it before proceeding. 
	`;

	return prepPrompt;


}



module.exports = createPrompt