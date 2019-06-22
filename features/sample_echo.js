/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {


    controller.hears('help','message', async(bot, message) => {
        await bot.reply(message, "I heard a help message. I can't help you, sorry.");
    });

  //   controller.on('message', async(bot, message) => {
  //       await bot.reply(message, `I can't say, because I don't know.`);
  // });





    controller.hears('Is anyone','message', async(bot, message) => {
        await bot.reply(message, "I'm here!");
    });

    controller.hears('info','message', async(bot, message) => {
        await bot.reply(message, "I'm chatbot!");
    });

    controller.hears('how are you?','message', async(bot, message) => {
        await bot.reply(message, "I'm fine!");
    });

    controller.hears(['hello', 'hi'],'message', async(bot, message) => {
        await bot.reply(message, 'Nice to meet you!');
    });

    controller.hears('menu','message', async(bot, message) => {
        await bot.reply(message, "I haven't got menu.");
    });

    controller.hears('name','message', async(bot, message) => {
        await bot.reply(message, "I'm Taras Bot.");
    });

}
