var request = require('request');
var CronJob = require('cron').CronJob;
var twit = require('twit');

//keys and tokens that are given after creating a twitter application
//keys and tokens for @CRosterGolf
var T = new twit({
  consumer_key:			      'p5BvQAhbvb47ScZEpwIwrDySj',
  consumer_secret:		    'AK6ACnJgdxraBLdiMcBywHRkXG72LvAnWhu9f2sv5zU7ouiCMB',
  access_token:			      '1006981434148392961-cW11TFyMYK7sb0JWfm6kX0NntkGX2l',
  access_token_secret:		'njUoYlB8wAVzIJwpyE6HNYEdsAZOL1WUIE8hlVe7gwfni',
  timeout_ms:              60*1000
});
var contest_id, title, winner, type, payout;
var scores_updated, date, current_time;
var j = 0;
var category = "fantasysports";
var sub_category = "golf";
var tweet;

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
                scores_updated = body.contest_report[i].scores_updated;
                
                date = new Date();
                current_time = date.getTime();
                
                request.post(
                    'https://www.coinroster.com/RosterReport.api',
                    { json: {"contest_id":contest_id} },
                    function (error, response, body) {                                      
                        //excludes pari-mutuel contest results since there is no winning user
                        //only gets contests settled within 3 hours
                        if (type != 'PARI-MUTUEL' && scores_updated >= (current_time - 10800000)) {                          
                            //gets contest winner and payout
                            //index of 0 since the first result is the winner's information
                            winner = body.entry_report[0].user;
                            payout = body.entry_report[0].payout;
                            
                            //in the event of a tie
                            if (body.entry_report[0].score == body.entry_report[1].score){
                                tweet =  {
                                status: ('there is a tie for 1st! Check out the results for ' + title + ' at https://www.coinroster.com/rosters.html?contest_id=' + contest_id + ' #fantasygolf #pga')
                                };        
                            }
                            //in the event of one winner
                            else{
                                tweet =  {
                                status: ('winner of ' + title + ' is ' + winner + ' with a payout of ' + payout + ' BTC! Check out https://www.coinroster.com/rosters.html?contest_id=' + contest_id + ' for complete results #fantasygolf #pga') 
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
                        //if no contests settled within the last 3 hours
                        else{
                            console.log('contest not settled within the last 3 hours');
                        }
                    }
                );
            }
        }
    ); 
}

//changes contest index every second until no more settled contests are available
new CronJob('* * * * * *', function() {    
    settle(j); 
    j++;
}, null, true, 'America/New_York');
