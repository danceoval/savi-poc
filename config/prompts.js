
const promptEngineering = "Prompt Engineering is great for teams who are just getting started with AI. Recommended tools include Chat-GPT, Jasper.io, Copy AI, and Bard";
const nlp = "Natural Language Processing is great for use cases in Marketing and Sales. You need access to a lot of data. Tools include Amazon Comprehend";
const sentiment_analysis = "Sentiment Analysis is great for Marketing, Content, and Sales Team. You can use low-code tools like Chat-GPT or Google AutoML, or create your own network. If teams have access to social media or reviews, this is a good fit."
const predictive_analytics = "Predictive Analytics are great for teams in Marketing and Business Development. It requires a strong interest in AI and lots of data from different sources. Google AutoML is a good tool for it";

const greatSample = `Proposing an AI-Enabled Solution for Enhanced Gen Z Brand Awareness: 
Implementation Work Plan:

1. Data Collection and Preparation:
   - Collaborate with the data team to aggregate social media analytics, product reviews, and sales data.
   - Clean and preprocess the data to ensure accuracy and consistency.

2. Tool Selection:
   - Recommend leveraging Chat-GPT for sentiment analysis due to its user-friendly interface and AI capabilities.
   - If needed, consider utilizing Google AutoML for more advanced analysis.

3. Sentiment Model Development:
   - Train the sentiment analysis model using the collected and preprocessed data.
   - Fine-tune the model to capture nuances in Gen Z sentiment.

4. Integration with Marketing Strategy:
   - Collaborate with the marketing team to incorporate sentiment insights into the brand's messaging and content.
   - Develop personalized campaigns and content based on sentiment trends.

5. Monitoring and Iteration:
   - Continuously monitor sentiment trends and adjust marketing strategies accordingly.
   - Refine the sentiment analysis model based on new data and feedback.

6. Evaluation and Reporting:
   - Regularly assess the effectiveness of the sentiment analysis-driven strategies in improving Gen Z engagement.
   - Provide comprehensive reports to the client showcasing the impact of AI on brand awareness.

Dependencies and Tools:
- Chat-GPT or Google AutoML for sentiment analysis model development
- Collaborative effort with the data team for data collection and preparation
- Close partnership with the marketing team for strategy integration
- Continuous feedback loop with the client for iterative improvements

The proposed work plan ensures a seamless integration of AI into the marketing strategy, leading to increased brand awareness and engagement among Gen Z consumers.
`;


function generateBulletList(arr){
  const keys = [
  'Role: ', 
  'Current Priorities: ', 
  'Associated Challenge: ', 
  'Accessible Data:',
  "Team's AI Familiarity: ",
  "Processes and tasks that could be automated: ",
  "Specific customer segments to target: ",
  "How successful marketing campaings are measured: ",
  "Our main competitors, and how we are differentiated: ",
  "Aspects of competitors' marketing strategies to emulate our outperform: ",
  "Typical customer journey from awareness to purchase: ",
  "How interactions with customers are currently personalized: "

 ];
  return arr.map((item, idx) => {
    return `- ${keys[idx]}: ${item.answer}`;
  }).join('\n');
};


function createManagerPrompt(survey) {
	const surveyStr = generateBulletList(survey);

	const prepPrompt = `
		Your objective is to propose a relevant AI use case to your client that aligns with their role, priorities, challenges, and existing data resources. 

		${surveyStr}

		Use a warm, professional tone. Add line spacing in between sentences and bullets.

		Here are some sample usecases to consider:

		* ${predictive_analytics}
		* ${promptEngineering}
		* ${nlp}
		* ${sentiment_analysis}  

		Suggest one use case at a time. Give a short overview of the use case and a 1-2 sentence description. An example is below, delimited by triple asterisks.

		***
		I would recommend the following use for your company based on my AI and business expertise and your personal situation:

		Use Case: Sentiment Analysis for Social Media Engagement 

		Overview: Utilize sentiment analysis to analyze social media data and identify trends in customer sentiment towards the Nike brand, products, and marketing campaigns. Description: By implementing sentiment analysis on social media data, Nike can gain valuable insights into how customers perceive their brand and products. This information can be used to identify any negative sentiment or issues that need to be addressed, and also highlight positive sentiment and successful campaigns that can be further amplified. 

		This will help Nike increase social media engagement by understanding customer preferences and tailoring their marketing strategies accordingly.
		***
	`;

	return prepPrompt;


}

function createEmployeePrompt(topic){
	const prepPrompt = `
		You are an AI consultant helping an employee apply the following AI use-case at work:

		${topic}

		For the first core topic required to implement the use case, create a step-by-step learning plan. 
		Include resources (e.g, online courses, article, videos, workshop registration link, etc.) that the employee may use to upskill in relevant AI tools, topics, and technologies. 
		
		Please include any specific tools or technologies needed to complete the learning plan at the end delimited by brackets.

		Example: ['Google AutoML', 'Python Programming']
	`;

	return prepPrompt
}



module.exports = { createManagerPrompt, createEmployeePrompt}