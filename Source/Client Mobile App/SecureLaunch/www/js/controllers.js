var MobileApp=angular.module('app.controllers', ["firebase"])

var shareUserName=null;
  
MobileApp.controller('loginCtrl', ['$scope','$state','$stateParams','$firebaseAuth',
 function ($scope,$state,$stateParams,$firebaseAuth) { 
     // Initialize Firebase
      var config = {
        apiKey: "AIzaSyD_Yz44zpyoDDOdFLet5fgOjbIphxvlUq0",
        authDomain: "hackathonumkc.firebaseapp.com",
        databaseURL: "https://hackathonumkc.firebaseio.com",
        storageBucket: "hackathonumkc.appspot.com",
        messagingSenderId: "67063658991"
      };
    firebase.initializeApp(config);
    var fbAuth = $firebaseAuth();
     
    //Login into application using Firebase Authencation
    $scope.login=function(username,password){       
        shareUserName=username.substring(0,5);
        console.log("Username:"+shareUserName+" Password:"+password);
        fbAuth.$signInWithEmailAndPassword(username,password).then(function(authData) {
            $state.go("secureLaunch");
		}).catch(function(error) {
            alert("UnAuthencated User");
            $state.go("login");
        });
    }
}])
   
MobileApp.controller('secureLaunchCtrl', ['$scope', '$stateParams','$http', 
function ($scope, $stateParams,$http) {
    $scope.usernameData=shareUserName;
    var mongoLab = "https://api.mlab.com/api/1/databases/hackathon/collections/"+shareUserName+"?apiKey=DVaTBkDjynm4xhj1vJ1HXniGoKIUEmik";
    $http({
                method: 'GET',
                url: mongoLab
            }).then(function successCallback(response) {
                var dataKey=response.data[0].key;
                var status=response.status;
                console.log("Data :"+dataKey);
                console.log("Status :"+status);
                $scope.secretKey=dataKey;
                
            }, function errorCallback(response) {
                $scope.secretKey="Error loading key";
            });
    
    //Launch Button
    $scope.launch=function(){
        var status = "{\"status\":\"true\"}";
        document.getElementById("secureLaunch-button2").disabled = true;
        document.getElementById("secureLaunch-button3").disabled = true;
        $http({
                method: 'POST',
                url: mongoLab,
                data:status
            }).then(function successCallback(response) {
                console.log("Launch status inserted");
            }, function errorCallback(response) {
                console.log("status failed to insert");
            });
    }
    
    //Abort Button
    $scope.abort=function(){
        var status = "{\"status\":\"false\"}";
        document.getElementById("secureLaunch-button2").disabled = true;
        document.getElementById("secureLaunch-button3").disabled = true;
        $http({
                method: 'POST',
                url: mongoLab,
                data:status
            }).then(function successCallback(response) {
                console.log("Abort status inserted");
            }, function errorCallback(response) {
                console.log("status failed to insert");
            });
    }

}])
 