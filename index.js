const startBrowser = require("./browser");
const scrapeController = require("./scraperController");
const browser = startBrowser();
scrapeController(browser);
