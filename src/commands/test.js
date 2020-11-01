exports.run = (client, message, args) => {
    message.channel.send("Welcome adventurer to the discord mmorpg Bot! \nnow, to get started you will need to select a class! \n(Type the number to select your class!) \n1: Mage | 2: Warrior | 3: Archer | 4: Assassin | 5: Healer").catch(console.error);
}
