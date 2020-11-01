exports.run = (client, message, args) => {
    let classes = { '1': 'Mage', '2': 'Warrior', '3': 'Archer', '4': 'Assassin', '5': 'Healer' };
    message.channel.send("Welcome adventurer to the discord mmorpg Bot! \nnow, to get started you will need to select a class! \n(Type the number to select your class!) \n1: Mage | 2: Warrior | 3: Archer | 4: Assassin | 5: Healer").catch(console.error);
    message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 15000, errors: ['time'] })
        .then(collected => {
            if (classes[collected.first().content] != undefined) {
                message.channel.send(`You have chosen ${classes[collected.first().content]}`)
            }
            else { message.channel.send("You have responded with something that doesn't work") }
        }
        )
        .catch(() => message.channel.send("You didn't respond fast enough/Something went wrong!"));
}
