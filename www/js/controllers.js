angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope, NearYous) {
	$scope.hashtags = NearYous.all();
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('SendFeedbackCtrl', function($scope) {
})

.controller('ToggleCtrl', function($scope){

	// $scope.yesornoValue = "Yes";
	$scope.yesOrNoFunc = function(){
  	if($scope.yesornoValueBool == true){
  		$scope.yesornoValue = "Yes";
  	}else{
  		$scope.yesornoValue = "No";
  	}
	}
})

.controller('AddFeedbackCtrl', function($scope,$ionicPopup,$timeout) {
	$scope.showPopup = function() {
  	$scope.data = {}
	var myPopup = $ionicPopup.show({
    template: "<div class='list'>\
    <label class='item item-radio'><input type='radio' name='typeofquestion' value='long' ng-model='data.typeofquestion'><div class='item-content'>Long Answer</div><i class='radio-icon ion-checkmark'></i></label>\
    <label class='item item-radio'><input type='radio' name='typeofquestion' checked='checked' value='rating' ng-model='data.typeofquestion'><div class='item-content'>Rating</div><i class='radio-icon ion-checkmark'></i></label>\
    <label class='item item-radio'><input type='radio' name='typeofquestion' value='date' ng-model='data.typeofquestion'><div class='item-content'>Date</div><i class='radio-icon ion-checkmark'></i></label>\
    <label class='item item-radio'><input type='radio' name='typeofquestion' value='select' ng-model='data.typeofquestion'><div class='item-content'>Select From List</div><i class='radio-icon ion-checkmark'></i></label>\
    </div>",
    title: 'Select Type of Question',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Add</b>',
        type: 'button-positive',
        onTap: function(e) {

          if (!$scope.data.typeofquestion) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
           	alert($scope.data.typeofquestion)
             return $scope.data.wifi;
           }
        }
      },
    ]
  });
	
 }
});
