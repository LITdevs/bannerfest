let client;
let config;
let utilsy;
var CronJob = require("cron").CronJob;
const fs = require('fs');

function initAPIs(utils) {
    config = utils.apis["ccm-ccm"].config["@litdevs/bannerfest"];
    if(!config.bannerState) config.bannerState = "";
    client = utils.client
    utilsy = utils
    bannerify()
    new CronJob('0 0 0 * * *', bannerify).start()
}

function bannerify() {
    let decidedbanner;
    const availabanners = fs.readdirSync(`${__dirname}/../banners`).filter(fn => fn.startsWith(new Date().toLocaleString("en-GB", {day: "2-digit", month: "2-digit"}).replace("/", "-")));
    if(availabanners[0]) {
        config.bannerState = "holiday"
        utilsy.apis["ccm-ccm"].api.save("@litdevs/bannerfest")
        if(availabanners.length > 1) {
            decidedbanner = availabanners[Math.floor(Math.random()*availabanners.length)];
        } else {
            decidedbanner = availabanners[0]
        }
    } else {
        const grabbag = fs.readdirSync(`${__dirname}/../banners/grabbag`)
        config.bannerState = "normal"
        utilsy.apis["ccm-ccm"].api.save("@litdevs/bannerfest")
        decidedbanner = grabbag[Math.floor(Math.random() * grabbag.length)] 
    }
    console.log(availabanners, config.bannerState, decidedbanner);
    if(decidedbanner) {
        client.guilds.fetch("868937321402204220").then(server => server.setBanner(`${__dirname}/../banners/${decidedbanner}`, "bannerfest update")
            .then(function() {
                if(config.bannerState == "holiday") client.channels.fetch('951903299236413500').then(channel=>channel.send(`hey everyone! we're now celebrating ${decidedbanner}! have fun!`))
            })
            .catch(err => {
                console.log(err)
            }))
    }
}

module.exports = {
    initAPIs
}
