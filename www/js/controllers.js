angular.module('starter.controllers', [])

.controller('loginCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory,$window,$rootScope) {
		$scope.loginData = {};
		$scope.isStudent = false;
		$scope.isTeacher = false;
        $scope.registerLoginStatus = true;
    
		$scope.login = function(type) {
			if(type == 'student'){
				str="./php/student-details.php?e="+$scope.loginData.email+"&p="+$scope.loginData.password;
				$http.get(str).success(function (response){
				if(response != 1){
				$scope.user_details = response.records;
				sessionStorage.setItem('student_id', $scope.user_details[0].student_id);
				sessionStorage.setItem('student_fName',  $scope.user_details[0].student_fName);
				sessionStorage.setItem('student_lName', $scope.user_details[0].student_lName);
				sessionStorage.setItem('student_email', $scope.user_details[0].student_email);
				sessionStorage.setItem('student_pass', $scope.user_details[0].student_pass);
				sessionStorage.setItem('studentRegister_date',$scope.user_details[0].studentRegister_date);

				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				}); 
			     $scope.isStudent = true;
                 $scope.registerLoginStatus = false;
                    
			     $state.go('app.class', {}, {location: "replace", reload: true});   
				}else{
					var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: 'Please check your credentials!'
					});
				}
			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: 'Please check your credentials!'
					});
			});
			}else if(type == 'teacher'){
				str="./php/teacher-details.php?e="+$scope.loginData.email+"&p="+$scope.loginData.password;
				$http.get(str).success(function (response){
				if(response != 1){
				$scope.teacher_details = response.records;
				sessionStorage.setItem('teacher_id', $scope.teacher_details[0].teacher_id);
				sessionStorage.setItem('teacher_fName',  $scope.teacher_details[0].teacher_fName);
				sessionStorage.setItem('teacher_lName', $scope.teacher_details[0].teacher_lName);
				sessionStorage.setItem('teacher_email', $scope.teacher_details[0].teacher_email);
				sessionStorage.setItem('teacher_pass', $scope.teacher_details[0].teacher_pass);
				sessionStorage.setItem('teacherRegister_date',$scope.teacher_details[0].teacherRegister_date);

				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
			     $scope.isTeacher = true;
                 $scope.registerLoginStatus = false;
                    
   $window.location.reload();
			     $state.go('app.class', {}, {location: "replace", reload: true});
				}else{
					var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: 'Please check your credentials!'
					});
				}
			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: 'Please check your credentials!'
					});
			});
			}

		};
})

.controller('profileCtrl', function($scope,$rootScope,$ionicHistory,$state) {
	$scope.isTeacher = false;
	$scope.isStudent = false;
	if(sessionStorage.getItem('student_id') != null){
		$scope.id= sessionStorage.getItem('student_id');
		$scope.fName= sessionStorage.getItem('student_fName');
		$scope.lName= sessionStorage.getItem('student_lName');
		$scope.email= sessionStorage.getItem('student_email');
		$scope.pass= sessionStorage.getItem('student_pass');
		$scope.registerDate= sessionStorage.getItem('studentRegister_date');
	}else if(sessionStorage.getItem('teacher_id') != null){
		$scope.id=sessionStorage.getItem('teacher_id');
		$scope.fName= sessionStorage.getItem('teacher_fName');
		$scope.lName= sessionStorage.getItem('teacher_lName');
		$scope.email= sessionStorage.getItem('teacher_email');
		$scope.pass= sessionStorage.getItem('teacher_pass');
		$scope.registerDate= sessionStorage.getItem('teacherRegister_date');
	}else{
		$scope.username = "Welcome";
		$scope.isStudent = false;
		$scope.isTeacher = false;
        $scope.registerLoginStatus = true;
	}


	$scope.logout=function(){
		if(sessionStorage.getItem('student_id') != null){
			delete sessionStorage.student_id;
			delete sessionStorage.student_fName;
			delete sessionStorage.student_lName;
			delete sessionStorage.student_email;
			delete sessionStorage.student_pass;
			delete sessionStorage.studentRegister_date;
		}else if(sessionStorage.getItem('teacher_id') != null){
			delete sessionStorage.teacher_id;
			delete sessionStorage.teacher_fName;
			delete sessionStorage.teacher_lName;
			delete sessionStorage.teacher_email;
			delete sessionStorage.teacher_pass;
			delete sessionStorage.teacherRegister_date;
		}

			$ionicHistory.nextViewOptions({
				disableAnimate: true,
				disableBack: true
			});
			$scope.isStudent = false;
			$scope.isTeacher = false;
        
			$state.go('app.login', {}, {location: "replace", reload: true});
	};
})

.controller('registerCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory,$window) {

	$scope.studentRegisterData = {};
	$scope.teacherRegisterData = {};

	$scope.isStudent = false;
	$scope.isTeacher = false;
	$scope.registerSatus = true;
	$scope.teacherRegister = false;
	$scope.studentRegister = false;

		$scope.openRegisterPage = function(registerType){
		if(registerType == "teacher"){
				$scope.teacherRegister = true;
				$scope.studentRegister = false;
		}else if(registerType == "student"){
				$scope.studentRegister = true;
				$scope.teacherRegister = false;
		}
	};

	$scope.senddata = function(registerType){
		if(registerType == "student"){
			$http.post('./php/registerStudent.php', $scope.studentRegisterData).success(function(data){
				if(data == " 1" ){
					$ionicHistory.nextViewOptions({
						disableAnimate: true,
						disableBack: true
					});
					var alertPopup = $ionicPopup.alert({
						title: 'Tamamdır!',
						template: 'Kayıt Oldunuz!'
					});		
					$state.go('app.login', {}, {location: "replace", reload: true});
				}else{
					$scope.result = "Error:"+data;
					var alertPopup = $ionicPopup.alert({
						title: 'Hata!',
						template: 'Hata!'
					});	
				}										
			});
		}else if(registerType == "teacher"){
			$http.post('./php/registerTeacher.php', $scope.teacherRegisterData).success(function(data){
				if(data == " 1" ){
					$scope.result = "basarılı";
					var alertPopup = $ionicPopup.alert({
						title: 'Tamamdır!',
						template: 'Kayıt Oldunuz!'
					});	
				}else{
					$scope.result = "Error:"+data;
					var alertPopup = $ionicPopup.alert({
						title: 'Hata!',
						template: 'Hata!'
					});	
				}
			});
		}
	};
})

.controller('checkoutCtrl', function($scope) {
	$scope.loggedin=function(){
		if(sessionStorage.getItem('student_id')==null){return 1;}
		else{
			$scope.student_id= sessionStorage.getItem('student_id');
			$scope.student_fName= sessionStorage.getItem('student_fName');
			$scope.student_lName= sessionStorage.getItem('student_lName');
			$scope.student_email= sessionStorage.getItem('student_email');
			$scope.student_pass= sessionStorage.getItem('student_pass');
			$scope.studentRegister_date= sessionStorage.getItem('studentRegister_date');
			return 0;
		}
	};
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $state, $ionicHistory, $ionicPopup) {
	if(sessionStorage.getItem('student_id')!=null){
		$scope.student_id= sessionStorage.getItem('student_id');
		$scope.student_fName= sessionStorage.getItem('student_fName');
		$scope.student_lName= sessionStorage.getItem('student_lName');
		$scope.student_email= sessionStorage.getItem('student_email');
		$scope.student_pass= sessionStorage.getItem('student_pass');
		$scope.studentRegister_date= sessionStorage.getItem('studentRegister_date');
		$scope.username = $scope.student_fName;
		$scope.isStudent = true;
        
            $scope.registerLoginStatus = false;
	}else if(sessionStorage.getItem('teacher_id')!=null){
		$scope.teacher_id=sessionStorage.getItem('teacher_id');
		$scope.teacher_fName= sessionStorage.getItem('teacher_fName');
		$scope.teacher_lName= sessionStorage.getItem('teacher_lName');
		$scope.teacher_email= sessionStorage.getItem('teacher_email');
		$scope.teacher_pass= sessionStorage.getItem('teacher_pass');
		$scope.teacherRegister_date= sessionStorage.getItem('teacherRegister_date');
		$scope.username = $scope.teacher_fName;
		$scope.isTeacher = true;
        
        $scope.registerLoginStatus = false;
	}else{
		$scope.username = "Welcome";
		$scope.isStudent = false;
		$scope.isTeacher = false;
         $scope.registerLoginStatus = true;
	}
	$scope.logout=function(){
		if(sessionStorage.getItem('student_id') != null){
			delete sessionStorage.student_id;
			delete sessionStorage.student_fName;
			delete sessionStorage.student_lName;
			delete sessionStorage.student_email;
			delete sessionStorage.student_pass;
			delete sessionStorage.studentRegister_date;
		}else if(sessionStorage.getItem('teacher_id') != null){
			delete sessionStorage.teacher_id;
			delete sessionStorage.teacher_fName;
			delete sessionStorage.teacher_lName;
			delete sessionStorage.teacher_email;
			delete sessionStorage.teacher_pass;
			delete sessionStorage.teacherRegister_date;
		}

			$ionicHistory.nextViewOptions({
				disableAnimate: true,
				disableBack: true
			});

			$scope.isStudent = false;
            $scope.isTeacher = false;
            $scope.registerLoginStatus = true;
			$state.go('app.login', {}, {location: "replace", reload: true});
		};
})

.controller('classCtrl', function($scope,$rootScope,$ionicHistory,$state,$http,$ionicPopup,$rootScope,$ionicModal,$window) {
		var class_details= [];
		if(sessionStorage.getItem('student_id') != null){
			$scope.student_id= sessionStorage.getItem('student_id');
			$scope.student_fName= sessionStorage.getItem('student_fName');
			$scope.student_lName= sessionStorage.getItem('student_lName');
			$scope.student_email= sessionStorage.getItem('student_email');
			$scope.student_pass= sessionStorage.getItem('student_pass');
			$scope.studentRegister_date= sessionStorage.getItem('studentRegister_date');
			$rootScope.isStudent = true;
	    	str="./php/getClass.php?teacher_id=";
			$http.get(str).success(function (response){
				$rootScope.class_details = response.records;
				class_details = $scope.class_details[0];
			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'No Class!',
						template: 'Student Sınıf alınamadı!'
					});
			});
		}else if(sessionStorage.getItem('teacher_id') != null){
			$scope.teacher_id=sessionStorage.getItem('teacher_id');
			$scope.teacher_fName= sessionStorage.getItem('teacher_fName');
			$scope.teacher_lName= sessionStorage.getItem('teacher_lName');
			$scope.teacher_email= sessionStorage.getItem('teacher_email');
			$scope.teacher_pass= sessionStorage.getItem('teacher_pass');
			$scope.teacherRegister_date= sessionStorage.getItem('teacherRegister_date');
			$rootScope.isTeacher = true;
			str="./php/getClass.php?teacher_id="+$scope.teacher_id;
			$http.get(str).success(function (response){
				$rootScope.class_details = response.records;
				class_details = $scope.class_details[0];
			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'No Class!',
						template: 'Teacher Sınıf alınamadı!'
					});
			});
		}else{
				$rootScope.isTeacher = false;
				$rootScope.isStudent = false;
              
		}

		$scope.deleteClass = function(class_id,index){
			str="./php/deleteClass.php?teacher_id="+$scope.teacher_id+"&class_id="+class_id;
			$http.get(str).success(function (response){
				if(response == 0){
					if(index == 0){
						$scope.class_details.splice(index);
					}else{
						$scope.class_details.splice(index,1);
					}
				}else{
					var alertPopup = $ionicPopup.alert({
						title: 'No Class!',
						template: 'Silincek sınıf yok!'
					});
				}
			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'No Class!',
						template: 'Silincek sınıf yok!'
					});
			});
		}

	  $ionicModal.fromTemplateUrl('templates/addClass.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });

	  $scope.closeClassModal = function() {
	    $scope.modal.hide();
	  };

	  $scope.addClassModal = function() {
	    $scope.modal.show();
	  };
		$scope.class_data = {};

		$scope.addClass = function(index){
			$scope.class_data.teacher_id = sessionStorage.getItem('teacher_id');
				$http.post('./php/addClass.php', $scope.class_data).success(function(response){
				if(response == 0){
					$scope.closeClassModal();
					$scope.class_details.push( index+1);
					$window.location.reload();
					$state.go('app.class', {}, {location: "replace", reload: true});
				}else{
					var alertPopup = $ionicPopup.alert({
						title: 'No Class!',
						template: 'Class Bulunumadı!'
					});
				}
			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'No Class!',
						template: 'ClassBulunamadı!'
					});
			});
		}

		$scope.edit = function(class_name,class_id) {
			$scope.data = {}
  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.wifi">',
    title: 'Edit Class Name',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            e.preventDefault();
          } else {
          	return $scope.data.wifi;
          }
        }
      }
    	]
  	});
   myPopup.then(function(res) {
   	$http.post('./php/editClass.php?class_name='+res+"&class_id="+class_id).success(function(response){
				if(response == 0){
					var alertPopup = $ionicPopup.alert({
						title: 'Düzenlendi!',
						template: 'Afferim lan!'
					});
					$state.go('app.class', {}, {location: "replace", reload: true});
				}else{
					var alertPopup = $ionicPopup.alert({
						title: 'Hata!',
						template: 'Class Yok!'
					});
				}
			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Hata!',
						template: 'Class Yok!'
					});
			});
   });
	}


})

.controller('classWindowCtrl', function($scope,$stateParams,$rootScope,$http,$ionicPopup,$state) {
	$scope.messageData = {};
    $scope.isStudentAttent = false;
	$scope.messageBoxEmpty = true;
	$scope.isStudent = false;
	$scope.isTeacher = false;
	$scope.digitPopulation = 0;

	if(sessionStorage.getItem('student_id') != null){
		$scope.isTeachers = $rootScope.isTeacher;
		$scope.student_id= sessionStorage.getItem('student_id');
		$scope.student_fName= sessionStorage.getItem('student_fName');
		$scope.student_lName= sessionStorage.getItem('student_lName');
		$scope.student_email= sessionStorage.getItem('student_email');
		$scope.student_pass= sessionStorage.getItem('student_pass');
		$scope.studentRegister_date= sessionStorage.getItem('studentRegister_date');
		$scope.isStudent = true;
        str="./php/getClass.php?teacher_id=";
			$http.get(str).success(function (response){
				$rootScope.class_details = response.records;
				class_details = $scope.class_details[0];
			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'No Class!',
						template: 'Student Sınıf alınamadı!'
					});
			});

		
	}else if(sessionStorage.getItem('teacher_id') != null){
		$scope.teacher_id=sessionStorage.getItem('teacher_id');
		$scope.teacher_fName= sessionStorage.getItem('teacher_fName');
		$scope.teacher_lName= sessionStorage.getItem('teacher_lName');
		$scope.teacher_email= sessionStorage.getItem('teacher_email');
		$scope.teacher_pass= sessionStorage.getItem('teacher_pass');
		$scope.teacherRegister_date= sessionStorage.getItem('teacherRegister_date');
		$scope.isTeacher = true;
        str="./php/getClass.php?teacher_id="+$scope.teacher_id;
			$http.get(str).success(function (response){
				$rootScope.class_details = response.records;
				class_details = $scope.class_details[0];
			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'No Class!',
						template: 'Teacher Sınıf alınamadı!'
					});
			});
	}
  	
    $scope.class_detail = $rootScope.class_details[$stateParams.classId];
  	var classPopulation = $scope.class_detail.population;

  	$scope.attend=function(class_id){
  		str="./php/attentClass.php?classID="+class_id+"&studentID="+$scope.student_id;
		$http.get(str).success(function (response){
			if(response == "1"){
				var alertPopup = $ionicPopup.alert({
					title: 'Success!',
					template: 'Successfuly'
				});
				$scope.isStudentAttent = true;
			}else{
				var alertPopup = $ionicPopup.alert({
					title: 'Fail!',
					template: 'Try Again!'
				});
			}
		}).error(function() {
				var alertPopup = $ionicPopup.alert({
					title: 'Fail!',
					template: 'Try Again!'
				});
		});
  	};

	$scope.exit=function(class_id){
		str="./php/exitClass.php?classID="+class_id+"&studentID="+$scope.student_id;
		$http.get(str).success(function (response){
		if(response == "1"){
            $scope.isStudentAttent = false;
            $state.go('app.class', {}, {location: "replace", reload: true});
		}else{
			var alertPopup = $ionicPopup.alert({
				title: 'Fail!',
				template: 'Try Again!'
			});
		}
		}).error(function() {
			var alertPopup = $ionicPopup.alert({
				title: 'Fail!',
				template: 'Try Again!'
			});
		});
  	};
    
   
    	

  	str="./php/getMessage.php?classID="+$scope.class_detail.class_id+"&teacherID="+$scope.class_detail.teacher_id;
		$http.get(str).success(function (response){
			$scope.message_details = response.messages;

			var class_population = classPopulation.split(",");
    		var count_population = class_population.length;
    		var asd = $scope.message_details[$stateParams.classId].message_ok;
    		var fff = $scope.message_details.length;
    		var message_id = $scope.message_details[$stateParams.classId].message_id;
    		var val = $scope.message_details[$stateParams.classId].message_ok.split(",");
    		var countOk = val.length;
if($scope.isStudent){
			for(var i=0;i<count_population;i++){
						if(class_population[i] ==  parseInt($scope.student_id)){
							$scope.isStudentAttent = true;
							for(var e=0;e<fff;e++){
								var s=0;
								for(var k=0;k<countOk;k++){
									if(val[k] != parseInt($scope.student_id)){
									s++;
								}
							}
							if(s == countOk){
							str="./php/message_ok.php?message_id="+message_id+"&message_ok="+asd+"&student_id="+$scope.student_id+"&class_id="+$scope.class_detail.class_id;
							$http.get(str).success(function (response){
							if(response != 1){
								alert("sometihng wrong");
							}else{
								$scope.digitPopulation++;
							}
							}).error(function() {
								var alertPopup = $ionicPopup.alert({
									title: 'No Class!',
									template: 'Class Alınamadı!'
								});
							});
							break;
						}
							
								
						}
							
					}
				}
		}
    		
                
    	if($scope.isTeacher == true){
    		for(var j=0;j<$scope.message_details.length;j++){
    			$scope.message_details[j].bluestack = false;
    			if($scope.message_details[j].message_ok.split(",").length == classPopulation.split(",").length){
    				$scope.message_details[j].bluestack = true;
    			}
    		}	
    	}
		if($scope.message_details == null){
			$scope.messageBoxEmpty = true;
		}else{
			$scope.messageBoxEmpty = false;
		}
		}).error(function() {
				var alertPopup = $ionicPopup.alert({
					title: 'No Message!',
					template: 'Mesaj yok mk!'
				});
		});

	$scope.sendMessage = function(){
		$scope.messageData.sendingMessage = $scope.sendingMessage;
		$scope.messageData.class_id = $scope.class_detail.class_id;
		$scope.messageData.teacher_id = $scope.teacher_id;
	$http.post("./php/sendMessage.php",$scope.messageData).success(function (response){
		if(response == " 1"){
			$scope.sendingMessage = "";
			str="./php/getMessage.php?classID="+$scope.class_detail.class_id+"&teacherID="+$scope.class_detail.teacher_id;
			$http.get(str).success(function (response){
			$scope.message_details = response.messages;
			$rootScope.messagesCounts = $scope.message_details;
			if($scope.isTeacher == true){
    	for(var j=0;j<$scope.message_details.length;j++){
    		$scope.message_details[j].bluestack =false;
    		if($scope.message_details[j].message_ok.split(",").length == classPopulation.split(",").length){
    		$scope.message_details[j].bluestack = true;
    		}
    	}	
    }
			if($scope.message_details == null){
				$scope.messageBoxEmpty = true;
			}else{
				$scope.messageBoxEmpty = false;
			}
		}).error(function() {
				var alertPopup = $ionicPopup.alert({
					title: 'No Message!',
					template: 'Mesaj yok mk!'
				});
		});
		}else{
			var alertPopup = $ionicPopup.alert({
				title: 'Fail!',
				template: 'Try Again!'
			});
		}
	}).error(function() {
			var alertPopup = $ionicPopup.alert({
				title: 'Fail!',
				template: 'Try Again!'
			});
	});
	}
})

