const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE9RczFycTNVQ2RpMkdsTEdSL2VVY0MrTFFYOVhjeFk0UFFQYi8wNHdtaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibHM0VWg5UVIyLzdxVWNTcEdSdWEzSXM3ZHd4amNxTjVFR1NiMU44R2ZXST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBUFdGaVppV3JUMGRudHQ3VXVKOEozQ1Q2NG1VeHUwQWszNThHMnA0aFdZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2K2ZyN244a3RQNlIxNG1HdHlSeWVDcjRaS1dEc09ZU2toNGUwcDU2Znc0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllGTjZINm9LbUhyNTA1T29iVXJ1VnBCd3hPT0x0SUFCblhpdk42dnR1V3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldxTTEwLzFhcGlEbXE3b0dyZlJIdm5VMmwzZkp4bzcycGxJQWc2OW1YUkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMElMUk5sSUJGLzBXclFJbzdxTS9Bd2pwemNCT3dtNk9SeHhBTTBocVhHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoialJtT0ZPWCs1aEM1Z2hWeThyM2hJYnRja1lPeEhmQXp1T0xjWS9uRVpIRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRVRE91cFFHUVI1QlNIZSt5ckVBRzIxRVFITjlzYXpUdDlSRHcvV1dZSEJKM1p1ZzJWYURSTlFmQ0o0dVgrSW9WeGdVb2R0dmhSQWh3NnJtNS9jUmp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDEsImFkdlNlY3JldEtleSI6IjQ4VzhWS0M0NVZvbU9YNUVTb2ltVXRWUFRNeHhLdVNLdVlqN3VBZHhpeVU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ild6SldUekQ0VFdpcG9tV2ZWQWRHSkEiLCJwaG9uZUlkIjoiMjYxYmMwZTItMjUwOC00NTkwLTlkZmUtMjljNThmMjEzY2ZmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlgraENBdFNhM1d3b09DcG5FUkJONTNrNlBPbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJncjlhUUFhZjRBekl3YzJWdXFLZVQ2Z3o2MFk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSFlONFlGRTkiLCJtZSI6eyJpZCI6IjkxOTc3NTU0MTMzNjo5NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLhjqfhjq4gQcqAyo/htIDJtCBCb3QgT25saW5lIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKaUJ0TkVIRUlDYXNMWUdHQWNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIrQVR1TDBsRzJzZ3FuTFRwYml3RlczRzNESVluWWtOeTk1OGhkZ1NnT1ZVPSIsImFjY291bnRTaWduYXR1cmUiOiI1MkV2RDdodmpDVisxaVRKM3hOcWVrcWxhT3paSkl6dFZMRnBoc3FybSs3Vms5Q0g4eVk5ejdyRGxLR211dzkxVENMOEs5bVAzZjZWR2hvc2FwL25CUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZE1SeGI1M3Mxd1NSdW5zeCtjd3B5WXZuSkVjYU9HNFBmMXBoR1gyZmVOQmZSTjFHNjVxeDlJZkF4WDN6L1M0NUVqTCtIRGRQWUZWdkN4d2tBU2lkZ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MTk3NzU1NDEzMzY6OTVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZmdFN2k5SlJ0cklLcHkwNlc0c0JWdHh0d3lHSjJKRGN2ZWZJWFlFb0RsViJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDY0ODcxNywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBcjAifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "aryan sir",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'ARYAN MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/8a326cd0cd97e3d554da0.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
