const fs = require("fs");
const { join } = require("path");

exports.run = (client, message, args) => {
    let commands = [];
    fs.readdir(join(__dirname), (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let commandName = file.split(".")[0];
            commands.push(` ${commandName}`);
        });
        message.channel.send(`The available commands are ${commands}`);
    });
}