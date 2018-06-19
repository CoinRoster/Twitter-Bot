# Twitter-Bot
Twitter bots for @CRosterGolf @CRosterBaseball

### Setup

Install [node.js](https://nodejs.org/en/)

### Prerequisites
```
npm install twit
npm install request
npm install cron
```
### Using Different Handles
Access tokens and consumer keys are required. These are generated after [creating a new twitter application.](https://apps.twitter.com/)

For example, the @CRosterBaseball keys and tokens:

```javascript
{
consumer_key:			'zrBtbOZNwDX5jpWKDoH5yIZZr',
consumer_secret:		'4xR1lyqsV4n1hIAlEKPJKjmBnuJv0bbAl5o4FlThWi3KcThM28',
access_token:			'1006983123341434880-zEIwi7orV9IjhoE3EsIz0zrS6PxsaK',
access_token_secret:		'uye6x2U6dZWKcWjaEI521SAWZGU2ppcTO5cFcC5WNJBZo',
}
```

### Accessing Different Lobbies
Different lobbies can be accessed by changing variables 'category' and 'subcategory'.

For example, accessing the open(status:1) 'Bitcoins' lobby would be done like so:

```javascript
var category = "financial";
var sub_category = "bitcoins";

request.post(
    'https://www.coinroster.com/ContestReport_Lobby.api',
    { json: {"category":category,"sub_category":sub_category,"contest_status":1} },
```


