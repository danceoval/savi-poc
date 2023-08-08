const {openai} = require("./config/open-ai.js")

const readlineSync = require('readline-sync');
const colors = require('colors');


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
        console.log(colors.red(e))
    }
}


async function main(){
	console.log(colors.bold.brightMagenta("🧚 Hello, I am Savi! Your fairy AI assistant! 🧚"))
	console.log(colors.bold.brightMagenta("🧚 Tell me about your role. 🧚"))
	console.log(colors.bold.brightMagenta("🧚 You can type 'Exit' at any time to leave the chat 🧚"))

	while(true){
		const userInput = readlineSync.question(colors.yellow("You: "))
	

		try {
			const completion = await getCompletion(userInput)
			

			if(userInput.toLowerCase() == 'exit'){
				console.log(colors.bold.brightMagenta(completion))
				return;
			} else {
				console.log(colors.bold.brightMagenta(completion))
			}

		} catch(err){
			console.error(colors.red(err))

		}
	}
	
}

main()