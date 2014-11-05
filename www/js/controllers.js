angular.module('starter.controllers', [])


.controller('DashCtrl',['$scope','form',function($scope,form){

    form.getAll().success(function(data){
	    $scope.hashtags=data.results;
    });

}])

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

.controller('AddFeedbackCtrl', function($scope,$ionicPopup,$ionicModal,$timeout) {

  $scope.questionFields = {'long' :{"type":"long","question":"","options":{"size":3,"placeholder":"Enter Text"}},
  ,{"type":"yesorno","question":"","options":{"default":false}};
  $scope.questionFields['date'] = {"type":"date","question":"","options":{"placeholder":"Enter Date"}};
  $scope.questionFields['number'] = {"type":"number","question":"","options":{"placeholder":"Enter Number"}};
  $scope.questionFields['select'] = {"type":"select","question":"","options":{"default":0}};
  $scope.questionFields['rating'] = {"type":"rating","question":"","options":{"range":"1-10"}};

  // [{
  //   "type":"long",
  //   "question":"How are you?",
  //   "options":"I am good."
  // },
  // {
  //   "type":"select",
  //   "question":"How good are you?",
  //   "answer": ['Good','Great',]
  // }]

  // [{
  //   "answer":"I am good."
  // },
  // {
  //   "answer": ['Good','Great',]
  // },{}]


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
           	alert($scope.data.typeofquestion);
             return $scope.data.wifi;
           }
        }
      },
    ]
  });
	
 }

 // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
});
