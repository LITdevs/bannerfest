let client;
let config;
let utilsy;
let serverHasBanner;
var CronJob = require("cron").CronJob;
const fs = require('fs');

/**
* Initilaize the APIs
* Start a cron job
*/
function initAPIs(utils) {
    config = utils.apis["ccm-ccm"].config["@litdevs/bannerfest"];
    if(!config.bannerState) config.bannerState = "";
    client = utils.client
    utilsy = utils
    bannerify()
    new CronJob('0 0 0 * * *', bannerify).start()
}

/**
* Get banner or something idk i cant read
*/
async function bannerify() {
    let server = await client.guilds.fetch("868937321402204220")
    serverHasBanner = server.features.includes("BANNER")

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
        decidedbanner = "grabbag/" + grabbag[Math.floor(Math.random() * grabbag.length)] 
    }
    console.log(availabanners, config.bannerState, decidedbanner);
    if(decidedbanner) {
        if(serverHasBanner) client.guilds.fetch("868937321402204220").then(server => server.setBanner(`${__dirname}/../banners/${decidedbanner}`, "bannerfest update"));
        client.channels.fetch('951903299236413500').then(channel=>channel.send({
            content: `hey everyone! we're now celebrating ${decidedbanner}! have fun!`,
            files: [{
                attachment: `${__dirname}/../banners/${decidedbanner}`,
                name: `${decidedbanner}`
            }]
        }));
    }
}

module.exports = {
    initAPIs
}
