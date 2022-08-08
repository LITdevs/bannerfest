module.exports = {
    api: function (somearguments) {
        if(somearguments == "test") message.channel.send(`Hi, ${message.author}. ${args[0] ? args[0] : "Try adding an argument!"}`)
    }
}