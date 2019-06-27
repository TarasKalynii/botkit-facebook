module.exports = function(controller) {
  controller.hears('Best-selling','message', async(bot, message) => {
    var bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');
    await bby.products("onlineAvailability=true", {show:'sku,name,salePrice,salesRankMediumTerm,image',sort:'salesRankMediumTerm.asc'}).then(async function(data){
      //console.log(data);
      //console.log(getElementsArray(data, elements));
      await bot.reply(message, {
        attachment:{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":getElementsForProductsList(data)
        }
      }
    });
  });
});

  function getElementsForProductsList(data) {
    let elements = [];
    for (var i = 0; i < data.products.length; i++) {
      //data.products[i]
      //create button
      let button = {
        type:"postback",
        title:"Info",
        payload:`INFO_${data.products[i].sku}`
      };
      //create buttons array
      let buttons = [ button ];
      //create element
      let element = {
        title:data.products[i].name,
        image_url:data.products[i].image,
        buttons:buttons
      }
      elements.push(element);
    }
    return elements;
  }
}
