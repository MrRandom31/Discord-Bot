const Discord = require("discord.js");
const client = new Discord.Client();

// Set the prefix
let prefix = "mmo ";

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  // Exit and stop if the prefix is not there or if user is a bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.startsWith(prefix + "help")) {
    message.channel.send("This Bot is really new, so there isn't much");
  } else
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("ah... yes... the first command ever made");
  }
});
 
