require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;

// Created instance of TelegramBot
const bot = new TelegramBot(token, {
    polling: true
});

// Listener for telegram's /start event
// This event happened when you first start the conversation with bot.
// Provide the list of available commands
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
        chatId,
        `
            Welcome to <b>Hello Bot</b>,
      
            Available commands:
        
            <b>/hello</b> - Displays  Hello World!
            <b>/help</b> -  Show this help
        `, {
            parse_mode: 'HTML',
        }
    );
});

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
        chatId,
        `
            Welcome to <b>Hello Bot</b>,
      
            Available commands:
        
            <b>/hello</b> - Displays  Hello World!
            <b>/help</b> -  Show this help
        `, {
            parse_mode: 'HTML',
        }
    );
})