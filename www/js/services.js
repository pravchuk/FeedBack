angular.module('starter.services',[])

.factory('form',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
    return {
        getAll:function(){
            return $http.get('https://api.parse.com/1/classes/form',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        get:function(scope,resCallback){
			var form = Parse.Object.extend("form");
			var query = new Parse.Query(form);
			query.equalTo("hash", "#MSEpresentation");
			query.find({
				success: function(results) {
					alert("Successfully retrieved " + results.length + " scores.");
					resCallback.call(scope,results[0].get('layout'));
					console.log(scope.text);
			},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
		},		
        create:function(data){
            return $http.post('https://api.parse.com/1/classes/form',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(id,data){
            return $http.put('https://api.parse.com/1/classes/form/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete('https://api.parse.com/1/classes/form/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        }
    }
}])
.value('PARSE_CREDENTIALS',{
    APP_ID: 'ojt8l3zRlv5UB2ZX196lefTmnvP7mleBInzOyJMq',
    REST_API_KEY:'xwztpbOdOvwbjq6n3hXwxMsfd84gj6w2N1WSXCNB'
})

.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});

