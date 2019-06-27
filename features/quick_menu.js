module.exports = function (controller) {
  controller.hears(['hello', 'hi', 'MAIN_MENU', 'menu', 'Main'], ['message', 'facebook_postback'], async (bot, message) => {
    // await bot.reply(message, '');
    await bot.reply(message, {
      text: 'Hello! Choose something!',
      quick_replies: [
        {
          content_type: 'text',
          title: 'My purchases',
          payload: 'true',
        },
        {
          content_type: 'text',
          title: 'Shop',
          payload: 'false',
        },
        {
          content_type: 'text',
          title: 'Favorites',
          payload: 'false',
        },
        {
          content_type: 'text',
          title: 'To invite a friend',
          payload: 'false',
        },
      ],
    });
  });
};
