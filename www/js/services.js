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
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var nearyous = [
    { id: 0, hastag: '#NewDumpTruck', image: 'ion-email', note:'Fancy New Dump Truck'},
    { id: 1, hastag: '#HalloweenParty14', image: 'ion-chatbubble-working', note:'PESIT CS 7'},
    { id: 2, hastag: '#Awesomo4000', image: 'ion-mic-a', note: 'Cartman' },
    { id: 3, hastag: '#AshKetchum' , image: 'ion-mic-a', note:'Gotta Catchem All'},
    { id: 3, hastag: '#KFCmachoWeek' , image: 'ion-mic-a', note:'Free Fries'}
  ];

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
