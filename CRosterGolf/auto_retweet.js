var twit = require('twit');
//keys and tokens that are given after creating a twitter application
//keys and tokens for @CRosterGolf
var T = new twit({
  consumer_key:			'p5BvQAhbvb47ScZEpwIwrDySj',
  consumer_secret:		'AK6ACnJgdxraBLdiMcBywHRkXG72LvAnWhu9f2sv5zU7ouiCMB',
  access_token:			'1006981434148392961-cW11TFyMYK7sb0JWfm6kX0NntkGX2l',
  access_token_secret:		'njUoYlB8wAVzIJwpyE6HNYEdsAZOL1WUIE8hlVe7gwfni',
  timeout_ms:                   60*1000
});

//accounts to track or filter for
var i,j;
var account = ["FantasyLabsGOLF","PGATOUR","GolfChannel","USGA","GolfCentral"];
var tweet;

for(i = 0;i < account.length;i++){
    //gets tweets from prefered timelines
    T.get('statuses/user_timeline', { screen_name: account[i], include_rts: false, count: 4 },  function (err, data, response) { 
        for(j = 0;j < data.length;j++){
            tweet = data[j].text;
            //filters tweets for prefered hashtag
            if (tweet.includes("Champ") == true || tweet.includes("Fantasy") == true || tweet.includes("Betting") == true){      
                //retweets
                T.post('statuses/retweet/:id', { id: data[j].id_str }, function (err, data, response) {
                    if (err){
                        console.log('Not Retweeted!');
                    }
                    else{
                        console.log('Retweeted!');
                    }
                });
            }
        }
    });
}
