module.exports = function (controller) {
  controller.hears(async (message) => message.text && message.text.toLowerCase() === 'foo', ['message'], async (bot, message) => {
    bot.reply(message, 'I heard "foo" via a function test');
  });

  controller.hears(new RegExp(/^\d+$/), ['message','direct_message'], async function(bot, message) {
    bot.reply(message, { text: 'I heard a number using a regular expression.' });
  });

  controller.hears(['allcaps', new RegExp(/^[A-Z\s]+$/)], ['message', 'direct_message'], async function (bot, message) {
    bot.reply(message, { text: 'I HEARD ALL CAPS!' });
  });
};
