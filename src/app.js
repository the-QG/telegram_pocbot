require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;

// Created instance of TelegramBot
const bot = new TelegramBot(token, {
    polling: true
});

//file reader
const fs = require('fs');

// Listener for telegram's /start event
// This event happens when you first start the conversation with bot.
// Provide the list of available commands
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
        chatId, help
        , {
            parse_mode: 'HTML',
        }
    );
});

//help menu, add all bot commands to this list, also add to @botfather
const help = `
Welcome to <b>Reading Tutor</b>,

  Available commands:

  <b>/hello</b> - Displays  Hello World!
  <b>/help</b> -  Show this help
  <b>/courses</b> - Select a course
  <b>/incoming</b> - Not yet working
`;

//custom commands

//Listener for hello command
bot.onText(/\/hello/, (msg, match) => {
   const chatId = msg.chat.id;
     bot.sendMessage(
       chatId,
       'Hello World!',
   );
});

//Listener for help command
bot.onText(/\/help/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
        chatId, help
        , {
            parse_mode: 'HTML',
        }
    );
})

let currentLevel;


//courses command allows selection of starting level and stores it in currentLevel
bot.onText(/\/courses/, (msg, match) => {
	const chatId = msg.chat.id;	
	
	 bot.sendMessage(chatId,'Please select your starting level.', {
		reply_markup: {
		inline_keyboard: [[
			{
			text: 'Level 1',
			callback_data: 1
			},{
			text: 'Level 2',
			callback_data: 2
			},{
			text: 'Level 3',
			callback_data: 3
			}
		]]
		}
	});
		
});


//use callback from inline keyboard to set currentLevel
bot.on("callback_query", (callbackQuery) => {
	const query = callbackQuery;		
	bot.answerCallbackQuery(query.id)
        .then(() => questions());
	
	currentLevel = "level_"+query.data;	
	
	//load current story using currentLevel
	let storyLocation = "./res/stories/"+currentLevel+".txt";		

	fs.readFile(storyLocation, 'utf8', function(err, data) {
		if (err) throw err;
			bot.sendMessage(
			query.message.chat.id, data
			, {
				parse_mode: 'HTML',
			})
		});		
});

function questions(){
	//load questions
	let questionLocation = "./res/questions/"+currentLevel+".txt";			

	fs.readFile(questionLocation, 'utf8', function(err, data) {
		if (err) throw err;
		console.log(data);
		return(
		  data
		, {
			parse_mode: 'HTML',
		})
	});	
}



