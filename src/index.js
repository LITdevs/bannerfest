module.exports = {
    execute: function (message, args) {
        message.channel.send(`Hi, ${message.author}. ${args[0] ? "Cool argument!" : "Try adding an argument!"}`)
    },
    registerEventHandlers: function (cb) {
        cb("messageReactionAdd", async function (reaction, user){
            if (reaction.partial) {
                try {
                    await reaction.fetch();
                } catch (error) {
                    console.error('Something went wrong when fetching the message:', error);
                    return;
                }
            }        
            reaction.message.channel.send("Someone reacted!") //please for the love of god dont do this in a real use case
        })
    }
}
