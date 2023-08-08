const {Configuration, OpenAIApi} = require("openai");
require("dotenv").config()

const readline = require('readline');



const configuration = new Configuration({
    apiKey: process.env.API_KEY
})

const openai = new OpenAIApi(configuration)


async function getCompletion(content){
	let messages = [{role: "user", content}];
	let model = "gpt-3.5-turbo";
	try {
        const completion = await openai.createChatCompletion({
            model,
            messages
        })
        return completion.data.choices[0].message.content
    } catch (e) {
        console.log(e)
    }
}


async function main(){
	console.log("*** STARTING ***")
	prompt = "Meow like a cat";
	chat = await getCompletion(prompt)
	console.log(chat)
	console.log("*** OVER ***")
}

main()