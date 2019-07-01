module.exports = function (controller) {
  controller.hears('To invite a friend', 'message', async (bot, message) => {
    bot.reply(message, {
      text: `Send this to your friends! http://m.me/322520468675048?ref=${message.sender.id}`,
      quick_replies: [
        {
          content_type: 'text',
          title: 'Main menu',
          payload: 'MAIN_MENU',
        },
      ],
    });
  });
};
