const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUVSNU81YmttUzExSFFsa05VZmtodjk3aUFndzQvZ3AxU3Y2ZGdyN2gyQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUkV4MERsNVczcjJ1SGg0UXRKNVU1cVNCUDRCQ2ZrYmhnTUtMRmZTcVczUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVSDdXUFBWR25ML0JPVVBMd0pLTnQxZDZLSHlKVmVPR1JiZXp5MEtqaUdvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnOUJpaUgycXZoeGVXaUh2akZuam1RRnFwVFB3U3VHdDgveTNHQkd3VlVNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtIM2dQRGV2VjdNcG5Qc2haQ242ZTA2VTdDTDE3Kzl6Ri9oU3NielEwMEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5QM1Y3Z1J1ZEovcFFoMWRjVnIxMVhBYUlmMWpMcFRYQ1A1N1ZtdElrR1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0VZd3h6cHlKZElEZHErTnZRL2lKdTY5SngrcnRxd0VhL0NHdnI4TnJrOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSGNsMm1veVFLV0p6b2ZNNS82WTM0aHAwZEcvWTZnVUVlUU9rZUZMcTdRUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldsNkQxblRLeUdpbmFlSU9RRlY3OThhUkE0QjlkOFE4SlZzZFU2MTVzRjRxeFVUamQwVGQ1STlUUDd1QW9saHkzTWhQKysxNHYxcUhZZllOWmdQckNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAyLCJhZHZTZWNyZXRLZXkiOiJvcDh5dzZVM2EySXgxZ3k1MUFwZ096ay9PUGJUZUkzTVcvT0M0Q3p5b3d3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc5NTg5MTcxMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFRDRDOTIxNDI0RjQyMEVBRTAzOEU4NEI2OUFFNzE1MCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQxMjY3MDEyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3OTU4OTE3MTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTIzQThFQzk1N0FBQTE4NkMyMDA0QUI2ODlCREFFQjgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MTI2NzAxM31dLCJuZXh0UHJlS2V5SWQiOjYxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6NjEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiT0VqZ3NzZnpSTjJNRmFLa3FETlhFUSIsInBob25lSWQiOiJlZjIwZDRhNy0yMzNlLTQ2ZjctYjU1Mi1iNmRiNWU4NWRmNGMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMDMyN0czYWV0OXpERFE3QTVPUm1qTmlrODJVPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik4vU1JUZW5jY3BSaE0rZ3hCZWViek5xaWxSQT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJYTkc2Sk1DUSIsIm1lIjp7ImlkIjoiMjU0Nzk1ODkxNzExOjEzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IirCsMKpT3JuZWgjXCLwn5GMIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOS1VrNEFDRUxQQXByNEdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJhUWMvSGRMTFI2eGxPS2hXa3F3ME8wVEdyQmtLcldWWWtma2NrTEVxWFR3PSIsImFjY291bnRTaWduYXR1cmUiOiJIQmcxdERoOGFaaVg4eW5CNE5LV2s1NXlZNVpTU1E2dzJrNENJdnBEckVLRm5YN2p5Y21lZW9zekRsVHJZOW5SQkxUZmFERjJmUjVYOU9PQXkzN1FCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZzM0cTBPMXptMFpzSGs1YStkSzlsa0NRZG9hclU2N2FDUmpxTHhVVzhJbU5ybEY4ejFRK1dEOEhTS3g1R00wa3VSVEl4UkNVSEk5aHBNSnZ2UDBZQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3OTU4OTE3MTE6MTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV2tIUHgzU3kwZXNaVGlvVnBLc05EdEV4cXdaQ3ExbFdKSDVISkN4S2wwOCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MTI2NzAxMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMRHEifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Corneh Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Corneh Tech",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CMW_TC',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/zjudre.webp',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '2',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE : process.env.ANTIDELETE || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
