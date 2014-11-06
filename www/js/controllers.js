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


.controller('SendFeedbackCtrl', function($scope,$sce,form) {

/*$scope.dummy = [{"type":"rating","question":"How is this?","options":{}},
				{"type":"yesorno","question":"Did u like it?","options":{}},
				{"type":"date","question":"When do u want it?","options":{}},
				{"type":"long","question":"Tell Me about yourself","options":{"placeholder" : "Text Goes here"}},
				{"type":"number","question":"can i have ur nunber","options":{"placeholder" : "eg : 10"}},
				{"type":"select","question":"Pick one","options":{"values":['pallal','chukka','niraj']}}
];*/

	$scope.genElement = function(type,args) //i think u need to put it in services.
	{		
		var s;
		if(type == 'rating')
		{	
			//type = rating, args = [Label]
			s='<div class="card">\
					<h4>' +args[0] + '</h4>\
						<div class="range range-positive">\
							<i class="icon ion-sad"></i>\
							<input class="valueHolder" type="range" name="volume">\
							<i class="icon ion-happy"></i>\
						</div>\
				</div>';
		}
		else if(type == 'number')
		{
			//type = number, args = [Label,placeholder]
			s = '<div class="card">\
				<label class="item item-input no-list-border">\
					<span class="input-label h4">'+args[0]+'</span>\
					<input class="valueHolder" type="number" placeholder="'+args[1]+'">\
				</label>\
			</div>';
		}
		else if(type == 'date')
		{
			//type = date, args = [Label]
			s = '<div class="card">\
					<label class="item item-input no-list-border">\
						<span class="input-label h4">'+args[0]+'</span>\
						<input class="valueHolder" type="date" placeholder="dd/mm/yyyy">\
					</label>\
				</div>';
		}
		else if(type == 'long')
		{
			//type = long, args = [Label,placeholder,rows]
			s = '<div class="card">\
					<h4>'+args[0]+'</h4>\
					<textarea class="valueHolder" placeholder="'+ args[1] +'" rows='+ args[2] +'>\</textarea>\
				</div>';
		}
		else if(type == 'boolean')
		{
			//type = boolean, args = [Label]
			s = '	<div class="card">\
						  <label class="item item-toggle no-list-border">\
							 <span class="h4">'+args[0]+'</span>\
							 <label class="toggle toggle-positive">\
							   <input class="valueHolder" type="checkbox" ng-model="yesornoValueBool" ng-change="yesOrNoFunc()">\
							   <div class="track">\
								 <div class="handle"></div>\
							   </div>\
							 </label>\
							 <span class="yesorno positive">{{yesornoValue}}</span>\
						  </label>\
					</div>';
		}
		else if(type == 'select')
		{
			//type = select, args = [Label,[<option1>,<option2>]]
			s = '<div class="card">\
					<label class="item item-input item-select no-list-border">\
						<div class="input-label">\
						  <span class="h4">'+args[0]+'</span>\
						</div>\
						<select class="valueHolder">';
						
						for(var i=0;i<args[1].length;i++)
							s+= '<option>'+args[1][i]+'</option>';
						  
			s +=		'</select>\
					 </label>\
				</div>';
			//return s;
		}
		//alert("hi");
		//alert();
		return $sce.trustAsHtml(s);
	}
		
		$scope.genForm = function (questionOb){
			console.log(questionOb);
			var s=[];
			for (var i =0;i< questionOb.length;i++)
			{var type = questionOb[i].type;
				var question = questionOb[i].question;
				var op = questionOb[i].options;
				if(type == 'yesorno') s.push($scope.genElement('boolean',[question])); 
				else if(type == 'rating') s.push($scope.genElement('rating',[question])); 
				else if(type == 'number') s.push($scope.genElement('number',[question,op.placeholder])); 
				else if(type == 'long') s.push($scope.genElement('long',[question,op.placeholder,op.size])); 
				else if(type == 'date') s.push($scope.genElement('date',[question]));
				else if(type == 'select') s.push($scope.genElement('select',[question,op.values]));
				//else if(type == 'select') alert(op.values);
				
			}
			this.fill = s;
			return s;
			
			
		}
		
		form.get($scope,$scope.genForm);
		form.insert();
		
		$scope.submit = function(){
			var ob = document.getElementsByClassName('valueHolder');
			alert("submit called");
			AnswerArr = []
			for(var i=0;i<ob.length;i++)
			{
				AnswerArr.push(ob[i].value);
			}
			console.log("Answers ->\n",AnswerArr);
			$scope.resultsDisplay = AnswerArr;
		}
	
})

/*
$scope.questionFields = {"long" :{"type":"long","question":"","options":{"size","placeholder":"Enter Text"}}
  ,"yesorno":{"type":"yesorno","question":"","options":{"yes":"Yes","no":"No","default":false}}
  ,"date":{"type":"date","question":"","options":{"placeholder":"Enter Date"}}
  ,"number":{"type":"number","question":"","options":{"placeholder":"Enter Number"}}
  ,"select":{"type":"select","question":"","options":{"default":0}}		
  ,"rating":{"type":"rating","question":"","options":{"range":"1-10"}}}; - range to implement

*/



.controller('ToggleCtrl', function($scope){

	$scope.yesornoValue = "Yes";
	$scope.yesOrNoFunc = function(){
  	if($scope.yesornoValueBool == true){
  		$scope.yesornoValue = "Yes";
  	}else{
  		$scope.yesornoValue = "No";
  	}
	}
})

.controller('AddFeedbackCtrl', function($scope,$ionicPopup,$ionicModal,$timeout) {

  $scope.questionFields = {"long" :{"type":"long","question":"","options":{"size":3,"placeholder":"Enter Text"}}
  ,"yesorno":{"type":"yesorno","question":"","options":{"yes":"Yes","no":"No","default":false}}
  ,"date":{"type":"date","question":"","options":{"placeholder":"Enter Date"}}
  ,"select":{"type":"select","question":"","options":{"default":0,"values":[]}}
  ,"number":{"type":"number","question":"","options":{"placeholder":"Enter Number"}}
  ,"rating":{"type":"rating","question":"","options":{"range":"1-10"}}};

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
  	
    $scope.data = {};

	  var myPopup = $ionicPopup.show({
    template: "<div class='list'>\
    <label class='item item-radio'><input type='radio' name='typeofquestion' value='long' ng-model='data.typeofquestion'><div class='item-content'>Long Answer</div><i class='radio-icon ion-checkmark'></i></label>\
    <label class='item item-radio'><input type='radio' name='typeofquestion' value='rating' checked='checked' ng-model='data.typeofquestion'><div class='item-content'>Rating</div><i class='radio-icon ion-checkmark'></i></label>\
    <label class='item item-radio'><input type='radio' name='typeofquestion' value='select' ng-model='data.typeofquestion'><div class='item-content'>Select From List</div><i class='radio-icon ion-checkmark'></i></label>\
    <label class='item item-radio'><input type='radio' name='typeofquestion' value='date' ng-model='data.typeofquestion'><div class='item-content'>Date</div><i class='radio-icon ion-checkmark'></i></label>\
    <label class='item item-radio'><input type='radio' name='typeofquestion' value='number' ng-model='data.typeofquestion'><div class='item-content'>Number</div><i class='radio-icon ion-checkmark'></i></label>\
    <label class='item item-radio'><input type='radio' name='typeofquestion' value='yesorno' ng-model='data.typeofquestion'><div class='item-content'>Yes or No</div><i class='radio-icon ion-checkmark'></i></label>\
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
              //var htmlInputElement;
            // switch($scope.data.typeofquestion){
            //   case 'long':  htmlInputElement = '<div class="card">\
            //                     <input type="text" name="q1" placeholder="Question"/>\
            //                     <input type="number" name="number"/>\
            //                 </div>';

            //                 console.log(htmlInputElement);
            //                 break;

            // }
            $scope.getNewElement($scope.data.typeofquestion);
           	
             return $scope.data.wifi;
           }
        }
      },
    ]
  });
	
 }


 $scope.getNewElement = function(typeofquestion){
  var Mytemplate;
    switch(typeofquestion){
      case 'long': Mytemplate = '<div class="card">\
                                  <input type="text" placeholder="Enter Question"/>\
                                  <input type="number" placeholder="Enter Number of Rows"/>\
                                  <input type="text" placeholder="Enter Question Placeholder"/>\
                                  <input type="text" placeholder="Enter Answer Placeholder"/>\
                                </div>';
                      break;
      case 'rating' : Mytemplate = '<div class="card">\
                                      <input type="text" placeholder="Enter Question"/>\
                                      <input type="number" placeholder="Enter Start of Range"/>\
                                      <input type="number" placeholder="Enter End of Range"/>\
                                    </div>';
                      break;
      case 'select' : Mytemplate = '<div class="card">\
                                      <input type="text" placeholder="Enter Question"/>\
                                      <input type="number" placeholder="Enter Option 1"/>\
                                      <input type="number" placeholder="Enter Option 2"/>\
                                      <input type="number" placeholder="Enter Option 3"/>\
                                    </div>';
                      break;
      case 'date' : Mytemplate = '<div class="card">\
                                      <input type="text" placeholder="Enter Question"/>\
                                    </div>';
                      break;
      case 'number': Mytemplate = '<div class="card">\
                                      <input type="text" placeholder="Enter Question"/>\
                                    </div>';
                      break;
      case 'yesorno': Mytemplate = '<div class="card">\
                                      <input type="text" placeholder="Enter Question"/>\
                                      <input type="number" placeholder="Yes Value"/>\
                                      <input type="number" placeholder="No Value"/>\
                                    </div>';
                      break;
      
    }

    var getElementPopUp = $ionicPopup.show({
      template : Mytemplate,
      title: 'Question Fields',
      subTitle: 'Enter Options for the Question',
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
              //var htmlInputElement;
            // switch($scope.data.typeofquestion){
            //   case 'long':  htmlInputElement = '<div class="card">\
            //                     <input type="text" name="q1" placeholder="Question"/>\
            //                     <input type="number" name="number"/>\
            //                 </div>';

            //                 console.log(htmlInputElement);
            //                 break;

            // }
            
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
