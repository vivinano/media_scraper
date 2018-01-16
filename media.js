//Declarings imports
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

//urls array to search from
var urls = [];
var pathtoimg = 'https://www.reddit.com/r/wallpaper/';

//requests html files
request(pathtoimg,function(err,res,body){
  //if website is alive and working
if(!err && res.statuscode == 200){
  //set $ to the body req
  var $ = cheerio.load(body);
     //searches through each a tag title
    $('a.title').each(function(){
      //targets the href
          var entry = $(this).attr('href');
          if(entry.indexOf('i.imgur.com') != -1){
            urls.push(entry);
          };

    });
    console.log(urls);
    console.log('Search and scan ' + urls.length + ' Items');
    for(var i = 0; i < urls.length; i++){
      request(urls[i]).pipe(fs.createWriteStream('wallpaper/' + i + '.png'));
    }
}
});
