const {openai} = require("./config/open-ai.js")

const readline = require('readline');


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
	prompt = "make an animal sound";
	chat = await getCompletion(prompt)
	console.log(chat)
	console.log("*** OVER ***")
}

main()