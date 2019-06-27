module.exports = function (controller) {
  controller.hears(['Shop', 'PRODUCT_CATALOG'], ['message', 'facebook_postback'], async (bot, message) => {
    // await bot.reply(message, "What do you search? Please write.");
    await bot.reply(message, {
      text: 'Hello! Choose something!',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Best-selling',
          payload: 'true',
        },
        {
          content_type: 'text',
          title: 'Go search',
          payload: 'false',
        },
      ],
    });
  });
};
