var request = require('request');
var twit = require('twit');
//keys and tokens that are given after creating a twitter application
//will be different for each handle
var T = new twit({                                                              
  consumer_key:         'E5eDOFhog2Dm7b3Yc75NbeSjb',                            
  consumer_secret:      'C9K4k2erEwGTwKRlmuaqyLeCeG94ayQntJsq26cigRtTlOPEWj',
  access_token:         '994232513626243072-UIVtqoCRuEDlgQhUMjMjbbsdz9Wq88A',
  access_token_secret:  'FehguX0rcJjZaoXG5BTZIqBnH2voLC9bYpDnDFLP7u42F',
  timeout_ms:           60*1000
});

var category = 'fantasysports';
var sub_category = 'golf';

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
