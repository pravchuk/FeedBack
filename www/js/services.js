angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
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
})

.factory('NearYous', function() {
console.log('inside nearus');
  //alert ("hey1");
  
  // Might use a resource here that returns a JSON array

    /*$scope.feedbacks = [];
     var data = window.localStorage.getItem('feedbacks');
	console.log('hell yeh1.1');
    if (data != null )  {
        $scope.feedbacks   = null;
        $scope.feedbacks   = JSON.parse(data);
        console.log('using local storage');
   }
   else {*/
	var scope = this ;
       var fbObj = Parse.Object.extend("form");
       var query = new Parse.Query(fbObj);
	   var nearyous ;
       //query.descending("createdAt");  //specify sorting
      //query.limit(20);  //specify limit -- fetch only 20 objects

       query.find({
	   //alert ("hey1");
           success:function(results) { 
               scope.$apply(function() {
			   alert ("hey1");
			   
			   scope.nearyous = [
    { id: 0, hastag: '#NewDumpTruck', image: 'ion-email', note:'Fancy New Dump Truck'},
    { id: 1, hastag: '#HalloweenParty14', image: 'ion-chatbubble-working', note:'PESIT CS 7'},
    { id: 2, hastag: '#Awesomo4000', image: 'ion-mic-a', note: 'Cartman' },
    { id: 3, hastag: '#AshKetchum' , image: 'ion-mic-a', note:'Gotta Catchem All'},
    { id: 3, hastag: '#KFCmachoWeek' , image: 'ion-mic-a', note:'Free Fries'}
  ];
  console.log('populating array now');
			   
                  var index =0;
                  var Arrlen=results.length ;

                   for (index = 0; index < Arrlen; ++index) {
				   alert ("success");
                       var obj = results[index];
                        scope.nearyous.push({ 
                          id :  obj.attributes.user_id,
                          hastag: obj.attributes.hash,
                          note : 'some note',
						  image : 'ion-mic-a'
						  });
                   }
                  //window.localStorage.setItem('feedbacks', JSON.stringify($scope.feedbacks));
				  console.log('hell yeh');
            });     
        },
		
        error:function(error) {
              console.log("Error retrieving cities!");
        }
    }); //end query.find

  
  
  
  // Some fake testing data
  

  return {
    all: function() {
      return nearyous;
    },
    get: function(hastagID) {
      // Simple index lookup
      return nearyous[hastagID];
    }
  }
});
