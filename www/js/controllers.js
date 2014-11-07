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

.controller('resultsctrl', function($scope,$sce) {
  $scope.things=['Pallal is awesome','so is prafulla','this is the best app','i like ravi and chukka app'];
  $scope.nos=['9845655555','9845990052','9986560718','8971780631'];
  
  
  $scope.genElement = function(type,label,value)
  {
	var s;
	if(type == 'rating')
	{
		s='  <div class="card" style="padding:5px;">\
				<h3 style="float:left;margin:5px">'+label+'</h3>\
				<img style="width:54px;float:right;position:relative;" src="/img/star.png"></img>\
				<span style="float:right; font: 20px calibri; margin:12px;color:blue;">'+value+'</span>\
			</div>';
	}
	else if(type == 'date')
	{
		s='  <div class="card" style="padding:5px;">\
				<h3 style="float:left;margin:5px">'+label+'</h3>\
				<span style="float:right; font: 20px calibri; margin:12px;color:#4a87ee;">'+value+'</span>\
			</div>';

	}
	else if(type == 'long')
	{
		s='  <div class="card" style="padding:5px;">\
				<h3 style="margin:5px">'+label+'</h3>\
				<ion-list>\
					<ion-item ng-repeat="i in '+value+'" style="height:30px;padding:3px;margin:3px;border:none;box-shadow:0px 1px 2px #eeeeee;/*border-color:#gggggg;border-top:none;border-radius:3px*/">\
						{{i}}\
					</ion-item>\
				</ion-list>\
			</div>';

	}
	else if(type == 'boolean')
	{
		s='<div class="card" style="padding:5px;">\
				<h3 style="float:left;margin:5px">'+label+'</h3>\
				<span style="float:right; font: 16px calibri; margin:12px;color:#4a87ee;">'+value.tr+':'+value.trvalue+'<br/>'+value.fl+':'+value.flvalue+'</span>\
			</div>';

	}
	else if(type == 'select')
	{
		s='<div class="card" style="padding:5px;">\
				<h3 style="float:left;margin:5px">'+label+'</h3>\
				<span style="float:right; font: 16px calibri; margin:12px;color:#4a87ee;"><span ng-repeat="i in '+value+'">{{i.index}} : {{i.value}}<br/></span>\
			</div>';

	}
	else if(type == 'number')
	{
		s='<div class="card" style="padding:5px;">\
				<h3 style="margin:5px">'+label+'</h3>\
				\
					<span ng-repeat="i in '+value+'" style="float:left;color:white;height:30px;padding:3px;margin:2px;background-color:#4a87ee;border-radius:3px">\
						{{i}}\
					</span>\
			</div>';

	}
	
  }
  $scope.fill = [];
  $scope.genResults = function(Qob,Rob)
  {
	for(var i =0;i<Qob.lenght;i++)
	{
		var q = Qob[i];
		var r = Rob [i];
		var ans;
		if(q.type == 'rating') ans = $scope.genElement('rating',q.question,r);
		else if(q.type == 'date') ans = $scope.genElement('date',q.question,r);
		else if(q.type == 'long') 
		{
			$scope['long'+i] = r;
			ans = $scope.genElement('long',q.question,'long'+i);
		}
		else if(q.type == 'boolean') ans = $scope.genElement('boolean',q.question,r);				// Possible YesOr NO\Boolean conflict
		else if(q.type == 'select')
		{
			$scope['select'+i] = r;
			ans = $scope.genElement('select',q.question,'select'+i);
		}
		else if(q.type == 'number')
		{
			$scope['number'+i] = r;
			ans = $scope.genElement('number',q.question,'number'+i);
		}

		
		$scope.fill.push($sce.trustAsHtml(ans))
	}
  }
  
  
  
  $scope.dummyQ={}
  
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
				var op = questionOb[i].myargs;
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

.controller('AddFeedbackCtrl', function($scope,$ionicPopup,$ionicModal,$sce,$timeout, AddFeedBackQuestionsObject, globalFunctions) {




  //$scope.qObject = {};

$scope.fill = [];
  

  $scope.genForm = function (questionOb){
      //alert(questionOb);
      var s=[];
      for (var i =0;i< questionOb.length;i++)
      {
        var type = questionOb[i].itype;
        var question = questionOb[i].myquestion;
        var myargs = questionOb[i].myargs;
        console.log(""+type+question+myargs);
        console.log(globalFunctions.genElement(type,question,myargs));
        s.push($sce.trustAsHtml(globalFunctions.genElement(type,question,myargs))); 
        // if(type == 'yesorno') s.push($sce.trustAsHtml(globalFunctions.genElement('boolean',$scope.myquestion,$scope.myargs))); 
        // else if(type == 'rating') s.push($sce.trustAsHtml(globalFunctions.genElement('rating',$scope.myquestion,$scope.myargs)));
        // else if(type == 'number') s.push($sce.trustAsHtml(globalFunctions.genElement('number',$scope.myquestion,$scope.myargs)));
        // else if(type == 'long') s.push($sce.trustAsHtml(globalFunctions.genElement('long',$scope.myquestion,$scope.myargs))); 
        // else if(type == 'date') s.push($sce.trustAsHtml(globalFunctions.genElement('date',$scope.myquestion,$scope.myargs)));
        // else if(type == 'select') s.push($sce.trustAsHtml(globalFunctions.genElement('select',$scope.myquestion,$scope.myargs)));
        
      }
      console.log(s);
      return s;
      
      
    }

    $scope.populateForm = function(type,question,myargs){
      var dummy = [{itype:"rating",myquestion:"How is this?",myargs:[1,10]},
        {itype:"yesorno",myquestion:"Did u like it?",myargs:['Yes','No']},
        {itype:"date",myquestion:"When do u want it?",myargs:[]},
        {itype:"long",myquestion:"Tell Me about yourself",myargs:['Write in Brief']},
        {itype:"number",myquestion:"can i have ur nunber",myargs:['Enter a number']},
        {itype:"select",myquestion:"Pick one",myargs:['Veg','NonVeg','Egg']}];
      //$scope.fill = $scope.genForm(dummy);//["<p>HI</p>","<p>HI</p>"];
      $scope.fill.push($sce.trustAsHtml(globalFunctions.genElement(type,question,myargs)))
    }

    

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
  $scope.myquestionObj = AddFeedBackQuestionsObject;
  //$scope.myquestionObj = 
  //$scope.myquestion = $scope.myquestionObj.myquestion;
  //alert($scope.myquestion);
  //$scope.myargs = $scope.myquestionObj.myargs;
  

  var Mytemplate;


  //long question   myargs:   0: Rows           1: placeholder
  //rating question myargs:   0: Starting Range 1: Ending Range        
  //select question myargs:   0: option1        1: option2       ..... onwards
  //date question myargs: []
  //number question myargs:   0: placeholder
  //yesorno question myargs:  0: yes value      1: no
  
    switch(typeofquestion){
      case 'long': Mytemplate = '<div class="card" ng-controller="QuestionInputCtrl">\
                                  <input type="text" ng-model="myquestionObj.myquestion" placeholder="Enter Question"/>\
                                  <input type="number" ng-model="myquestionObj.myargs[0]" placeholder="Enter Number of Rows"/>\
                                  <input type="text" ng-model="myquestionObj.myargs[1]" placeholder="Enter Placeholder"/>\
                                </div>';
                      break;
      case 'rating' : Mytemplate = '<div class="card">\
                                      <input type="text" ng-model="myquestionObj.myquestion" placeholder="Enter Question"/>\
                                      <input type="number" ng-model="myquestionObj.myargs[0]" placeholder="Enter Start of Range"/>\
                                      <input type="number" ng-model="myquestionObj.myargs[1]" placeholder="Enter End of Range"/>\
                                    </div>';
                      break;
      case 'select' : Mytemplate = '<div class="card">\
                                      <input type="text" ng-model="myquestionObj.myquestion" placeholder="Enter Question"/>\
                                      <input type="number" ng-model="myquestionObj.myargs[0]" placeholder="Enter Option 1"/>\
                                      <input type="number" ng-model="myquestionObj.myargs[1]" placeholder="Enter Option 2"/>\
                                      <input type="number" ng-model="myquestionObj.myargs[2]" placeholder="Enter Option 3"/>\
                                    </div>';
                      break;
      case 'date' : Mytemplate = '<div class="card">\
                                      <input type="text" ng-model="myquestionObj.myquestion" placeholder="Enter Question"/>\
                                    </div>';
                      break;
      case 'number': Mytemplate = '<div class="card">\
                                      <input type="text" ng-model="myquestionObj.myquestion" placeholder="Enter Question"/>\
                                    </div>';
                      break;
      case 'yesorno': Mytemplate = '<div class="card">\
                                      <input type="text"  ng-model="myquestionObj.question" placeholder="Enter Question"/>\
                                      <input type="number" ng-model="myquestionObj.myargs[0]" placeholder="Yes Value"/>\
                                      <input type="number" ng-model="myquestionObj.myargs[1]" placeholder="No Value"/>\
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
            $scope.populateForm($scope.data.typeofquestion,$scope.myquestionObj.myquestion,$scope.myquestionObj.myargs);
            console.log($scope.myquestionObj.myquestion);
            console.log($scope.myquestionObj.myargs);
            
           }
        }
      },
    ]

    });
 }
})


.controller('QuestionInputCtrl', function($scope, AddFeedBackQuestionsObject){
  $scope.myquestionObj = AddFeedBackQuestionsObject;
  $scope.myargs = $scope.myquestionObj.myargs;
});
