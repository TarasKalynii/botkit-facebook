module.exports = function (controller) {
  controller.hears('Go search', 'message', async (bot, message) => {
    bot.reply(message, "This isn't implemented because it wasn't necessary.");
  });
};
