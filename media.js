
// Load in modules
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
// empty array for urls storage
var media = [];

request('https://www.reddit.com/r/wallpaper/', function(err, res, body) {
  // checks if site is running
  if(!err && res.statusCode == 200){
    var $ = cheerio.load(body);
    // jquery searches page for each 'a.title'
    $('a.title').each(function(){
      // targets the href
      var url = $(this).attr('href');
      if(url.indexOf('i.imgur.com')!= -1){
      media.push(url);
      };
    });
      console.log(media);
      console.log("Search and Download " + media.length + " wallpapers");
      // for loop to scrape the images to folder
      for(var i = 0; i < media.length; i++){
          request(media[i]).pipe(fs.createWriteStream('wallpaper/' + i + '.jpg'));
      }
    }
});
