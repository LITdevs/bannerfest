let client;
let config;
const CronJob = require("cron").CronJob;

function initAPIs(utils) {
    config = util.apis["ccm-ccm"].config["bannerfest"];
    client = utils.client
    bannerify()
    new CronJob('0 0 0 * * *', bannerify)
}

function bannerify() {
    const availabanners = fs.readdirSync(`${__dirname}/../banners`).filter(fn => fn.startsWith(new Date().toLocaleString("en-GB", {day: "2-digit", month: "2-digit"}).replace("/", "-")));
    console.log(availabanners)
}

module.exports = {
    initAPIs
}