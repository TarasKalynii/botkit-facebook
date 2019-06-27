module.exports = function (controller) {
  controller.on('facebook_referral', async (bot, message) => {
    await bot.reply(message, 'facebook_referral');
  });
};
