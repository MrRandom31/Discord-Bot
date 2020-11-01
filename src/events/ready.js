module.exports = (client, message) => {
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'mmo help',
            type: 'PLAYING'
        }
    });
};