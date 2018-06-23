var twit = require('twit');
//keys and tokens that are given after creating a twitter application
//keys and tokens for @CRosterBaseball
var T = new twit({
  consumer_key:			'zrBtbOZNwDX5jpWKDoH5yIZZr',
  consumer_secret:		'4xR1lyqsV4n1hIAlEKPJKjmBnuJv0bbAl5o4FlThWi3KcThM28',
  access_token:			'1006983123341434880-zEIwi7orV9IjhoE3EsIz0zrS6PxsaK',
  access_token_secret:		'uye6x2U6dZWKcWjaEI521SAWZGU2ppcTO5cFcC5WNJBZo',
  timeout_ms:                   60*1000
});
//accounts to filter for
var i,j;
var account = ["theScoreMLB","CBSSportsMLB","MLB_Network"];
//var tweet;
for(i = 0;i < account.length;i++){
    //gets tweets from prefered timelines
    T.get('statuses/user_timeline', { screen_name: account[i], include_rts: false, count: 2 },  function (err, data, response) { 
        for(j = 0;j < data.length;j++){
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
    });
}
