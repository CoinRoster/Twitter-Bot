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
var user_handle = 'CRosterGolf';
var i;

//gets list of user id's that follow @CRosterGolf
T.get('followers/list', { screen_name: user_handle },  function (err, data, response) {    
    for(i = 0;i < data.users.length;i++){
        console.log(data.users[i].id_str);
        //follows users
        T.post('friendships/create', { user_id: data.users[i].id_str }, function (err, data, response) {
            if (err){
                console.log('Not Followed!');
            }
            else { 
                console.log('Followed!');
            }
        }         
        );
    }   
});
