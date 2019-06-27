module.exports = function (controller) {
  controller.hears('To invite a friend', 'message', async (bot, message) => {
    await bot.reply(message, `Send this to your friends! http://m.me/322520468675048?ref=${message.sender.id}`);
  });
};
