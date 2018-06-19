var request = require('request');
var twit = require('twit');
//keys and tokens that are given after creating a twitter application
//keys and tokens for @CRosterGolf
var T = new twit({                                                              
  consumer_key:         'p5BvQAhbvb47ScZEpwIwrDySj',                            
  consumer_secret:      'AK6ACnJgdxraBLdiMcBywHRkXG72LvAnWhu9f2sv5zU7ouiCMB',
  access_token:         '1006981434148392961-cW11TFyMYK7sb0JWfm6kX0NntkGX2l',
  access_token_secret:  'njUoYlB8wAVzIJwpyE6HNYEdsAZOL1WUIE8hlVe7gwfni',
  timeout_ms:           60*1000
});

var category = "fantasysports";
var sub_category = "golf";

request.post(
    'https://www.coinroster.com/ContestReport_Lobby.api',
    { json: {"category":category,"sub_category":sub_category,"contest_status":1} },
    function (error, response, body) {
        
        if (!error && response.statusCode == 200) {
            
            for (var i = 0;i < body.contest_report.length;i++){
                console.log('Now Open: ' + body.contest_report[i].title + ' https://www.coinroster.com/contest.html?id=' + body.contest_report[i].id);
                              
                var tweet = {
                status: ('Now Open: ' + body.contest_report[i].title + ' https://www.coinroster.com/contest.html?id=' + body.contest_report[i].id) 
                };
                
                T.post('statuses/update', tweet, tweeted);  

                function tweeted(err, data, response) {
                    if(err){
                        console.log("Something went wrong!");
                    }
                    else{
                        console.log("It worked!");
                    }
                }
            };
        }
    }          
);
