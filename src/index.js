let client;
let config;
var CronJob = require("cron").CronJob;

function initAPIs(utils) {
    config = utils.apis["ccm-ccm"].config["bannerfest"];
    client = utils.client
    bannerify()
    new CronJob('0 0 0 * * *', bannerify)
}

function bannerify() {
    const availabanners = fs.readdirSync(`${__dirname}/../banners`).filter(fn => fn.startsWith(new Date().toLocaleString("en-GB", {day: "2-digit", month: "2-digit"}).replace("/", "-")));
    client.users.fetch('708333380525228082').then(dm => {
        dm.send(availabanners)
    })
}

module.exports = {
    initAPIs
}