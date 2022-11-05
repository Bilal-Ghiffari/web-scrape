const Bot = require('./boot');

(async () => {
    await Bot.init();
    await Bot.start();
})();