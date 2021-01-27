const TelegramBot = require('node-telegram-bot-api');
const options = {polling: true};
let conexion = require('./conexion');
const bot: typeof TelegramBot = new TelegramBot(process.env['BOT_TOKEN'], options);
export {bot};