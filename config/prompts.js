
const promptEngineering = "Prompt Engineering is great for teams who are just getting started with AI. Recommended tools include Chat-GPT, Jasper.io, Copy AI, and Bard";
const nlp = "Natural Language Processing is great for use cases in Marketing and Sales. You need access to a lot of data. Tools include Amazon Comprehend";
const sentiment_analysis = "Sentiment Analysis is great for Marketing, Content, and Sales Team. You can use low-code tools like Chat-GPT or Google AutoML, or create your own network. If teams have access to social media or reviews, this is a good fit."
const predictive_analytics = "Predictive Analytics are great for teams in Marketing and Business Development. It requires a strong interest in AI and lots of data from different sources. Google AutoML is a good tool for it";



function generateBulletList(arr){
  return arr.map((item) => {
    return `* Question: ${item.question}, Answer: ${item.answer}`;
  }).join('\n');
};


function createPrompt(survey) {
	const surveyStr = generateBulletList(survey);

	const prepPrompt = `
		You are an expert strategy consultant, named Savi with 10 years of experience. 
		Your goal is to suggest a relevant use case for AI that they approve of. 

		You have recieved this information from the client regarding their role, current strategic priorities, and associated challenges. 
		You have also received information on the types of data their team has access to, and their comfort with AI.

		Client Information: 

		${surveyStr}

		Here are some sample usecases to consider:

		* ${predictive_analytics}
		* ${promptEngineering}
		* ${nlp}
		* ${sentiment_analysis}  

		When suggesting a use case, make sure the client agrees to it before proceeding.
		When they have approved a suggested use case, create a work plan for implementing it. Include your reasoning and any specific tools or dependencies.

	`;

	return prepPrompt;


}



module.exports = createPrompt