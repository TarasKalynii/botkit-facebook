module.exports = function (controller) {
  controller.hears(['Shop', 'PRODUCT_CATALOG'], ['message', 'facebook_postback'], async (bot, message) => {
    bot.reply(message, {
      text: 'Hello! Choose something!',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Best-selling',
          payload: 'true',
        },
      ],
    });
  });
};
