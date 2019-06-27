module.exports = function (controller) {
  controller.hears(async (message) => message.sticker_id, 'message', async (bot, message) => {
    await bot.reply(message, 'Cool sticker.');
  });
  controller.on('facebook_postback', async (bot, message) => {
    await bot.reply(message, 'post_back');
  });
  controller.on('message', async (bot, message) => {
    await bot.reply(message, {
      text: 'Message',
    });
  });
};
