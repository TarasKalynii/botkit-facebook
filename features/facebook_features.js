/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    /**
     * Detect when a message has a sticker attached
     */

    controller.hears(async(message) => message.sticker_id, 'message', async(bot, message) => {
        await bot.reply(message,'Cool sticker.');
    });



    controller.on('facebook_postback', async(bot, message) => {
        await bot.reply(message,`I heard you posting back a post_back about ${ message.text }`);
    });

    controller.on('message', async(bot, message) => {
        await bot.reply(message, {
          text: 'Choose a button',
          get_started:
              {
                      locale:"default",
                      text:"Hello!!"

              }
      });
    });



    const { BotkitConversation } = require('botkit');






    let convo = new BotkitConversation('tacos', controller);
      convo.say('SOMEONE SAID TACOS!');
      convo.ask('Do you want to eat a taco?', [
          {
              pattern: 'yes',
              default: true,
              handler: async(response, convo, bot) => {
                  await convo.gotoThread('yes_tacos');
              }
          },
          {
              pattern: 'no',
              handler: async(response, convo, bot) => {
                  await convo.gotoThread('no_tacos');
              }
          }
      ], 'wants_taco');

      convo.addMessage('Hooray for tacos!', 'yes_tacos');
      convo.addMessage('ERROR: Tacos missing!!', 'no_tacos');

      convo.after(async(results, bot) => {

          // results.wants_taco

      })

      // add to the controller to make it available for later.
      controller.addDialog(convo);

      controller.hears('tacos', 'message', async(bot, message) => {
          await bot.beginDialog('tacos');
      });


}
