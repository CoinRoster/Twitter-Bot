var request = require('request');
var CronJob = require('cron').CronJob;
var twit = require('twit');

//keys and tokens that are given after creating a twitter application
//keys and tokens for @CRosterGolf
var T = new twit({
  consumer_key:         'E5eDOFhog2Dm7b3Yc75NbeSjb',                            
  consumer_secret:      'C9K4k2erEwGTwKRlmuaqyLeCeG94ayQntJsq26cigRtTlOPEWj',
  access_token:         '994232513626243072-UIVtqoCRuEDlgQhUMjMjbbsdz9Wq88A',
  access_token_secret:  'FehguX0rcJjZaoXG5BTZIqBnH2voLC9bYpDnDFLP7u42F',
  timeout_ms:            60*1000
});
var contest_id, title, winner, type, payout;
var j = 0;
var category = 'fantasysports';
var sub_category = 'golf';

function settle(i){
    request.post(
        'https://www.coinroster.com/ContestReport_Lobby.api',
        { json: {"category":category,"sub_category":sub_category,"contest_status":3} },
        //gets contest ids, titles, and settlement types 
        function (error, response, body) {
            if (!error && response.statusCode == 200) {                                
                contest_id = body.contest_report[i].id;
                title = body.contest_report[i].title;
                type = body.contest_report[i].settlement_type;
                
                request.post(
                    'https://www.coinroster.com/RosterReport.api',
                    { json: {"contest_id":contest_id} },
                    function (error, response, body) {                                      
                        //excludes pari-mutuel contest results since there is no winning user
                        if (type != 'PARI-MUTUEL') {                          
                            //gets contest winner and payout
                            //index of 0 since the first result is the winner's information
                            winner = body.entry_report[0].user;
                            payout = body.entry_report[0].payout;
                            //in the event of a tie
                            if (body.entry_report[0].score == body.entry_report[1].score){
                                var tweet =  {
                                status: ('there is a tie for 1st! Check out the results for ' + title + ' at https://www.coinroster.com/rosters.html?contest_id=' + contest_id) 
                                };        
                            }
                            //in the event of one winner
                            else{
                                var tweet =  {
                                status: ('winner of ' + title + ' is ' + winner + ' with a payout of ' + payout + ' BTC! Check out https://www.coinroster.com/rosters.html?contest_id=' + contest_id + ' for complete results') 
                                };  
                            }  
                            T.post('statuses/update', tweet, tweeted);                                    
                                function tweeted(err, data, response) {
                                    if(err){
                                        console.log("Something went wrong!");
                                    }
                                    else{
                                        console.log("It worked!");
                                    }
                                }
                        }
                    }
                );
            }
        }
    ); 
}
//changes contest index every second until no more settled contests are available
new CronJob('* * * * * *', function() {
    j++;
    settle(j); 
}, null, true, 'America/New_York');
