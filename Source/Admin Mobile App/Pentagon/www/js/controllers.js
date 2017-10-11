var MobileApp=angular.module('app.controllers', ["firebase"])

var shareUserName=null;
var key=13;
var mod=17;
  
MobileApp.controller('launchKeyGeneratorCtrl', ['$scope', '$stateParams','$http',
function ($scope, $stateParams,$http) {
    /*console.log("Username:"+shareUserName);*/
    $scope.usernameData=shareUserName;
    $scope.calculateKeyAndSend=function () {
        var numOfUsers = 5;
		var threshold = 3;
		var a=[];
		
		a=coeffArr(threshold);
		function coeffArr(threshold)
		{
		  var arr=[];
		  var i;
			for (i = 0; i < threshold-1; i++) {
				arr[i]=Math.trunc((Math.random())*threshold);
			}
		  return arr;
		}
		
		function poly(x,threshold,key,a)
		 {
		  var sum=key;
		  var j=0;
		  for(var i=threshold-1;i>0;i--)
		  {
		   sum=sum+((a[j])*(Math.trunc(Math.pow(x, i))));
		   j=j+1;
		  }
		  return sum%mod;
		 }
		 
		function keygen(numOfUsers)
		{
		  var i;
		  var h=[];
		  for(i=0;i<=numOfUsers;i++)
		  {
			h[i]=poly(i,threshold,key,a);
			console.log("User["+i+"] ="+h[i]);
		  }
		   return h;
		}
		var h=[];
		h=keygen(numOfUsers);

        //constructing individual json and pushing to mongoLab
        
        function sendJson(numOfUsers)
		{
		  var i;
          var mongoLab;
		  var jsonKey=[];
		  for(i=1;i<=numOfUsers;i++){
              
            jsonKey[i]="{\"ClientUID\":"+i+",\"key\":"+h[i]+"}";
            /*console.log(jsonKey[i]);*/
              
            //pushing to mongoLab
            mongoLab="https://api.mlab.com/api/1/databases/hackathon/collections/user"+i+"?apiKey=DVaTBkDjynm4xhj1vJ1HXniGoKIUEmik";
            console.log(mongoLab); 
              $http({
                method: 'POST',
                url: mongoLab,
                data:jsonKey[i]
            }).then(function successCallback(response) {
                console.log("Inserted key for User");
            }, function errorCallback(response) {
                console.log("Unable to insert key for User");
            });
          }            
		}
        sendJson(numOfUsers); 
        alert("Sent Secret Key to Clients");
        document.getElementById("launchKeyGenerator-button1").disabled = true;            
    }
}])
   
MobileApp.controller('launchCtrl', ['$scope', '$stateParams','$http',
function ($scope, $stateParams,$http) {

    var acceptCount=0;
    var rejectCount=0;
    var keys=[] ;
    var array=[];
    var mod=17;
    var mongoLab = null;
    var numOfUsers = 5;
    var i;
    var j=0;

      for(i=1;i<=numOfUsers;i++){
        mongoLab="https://api.mlab.com/api/1/databases/hackathon/collections/user"+i+"?apiKey=DVaTBkDjynm4xhj1vJ1HXniGoKIUEmik";
        $http.get(mongoLab).then(function (response){
            /*console.log(response.data[0].key);
            console.log(response.data[1].status);*/
            var nstatus=response.data[1].status;
            if(nstatus=="true"){
                acceptCount=acceptCount+1;
                array[j]=response.data[0].key;
                keys[j]=response.data[0].ClientUID;
                console.log("j >> "+j);
                console.log("Key >> "+array[j]);
                console.log("ClientId >> "+keys[j]);
                j=j+1;
            }else{
                rejectCount=rejectCount+1;
            }
            $scope.accepted=acceptCount;
            $scope.rejected=rejectCount;
            //console.log(acceptCount+" , "+rejectCount);
            if(i==numOfUsers+1){

                var m = keys.length;
                var n = array.length;
                var masterKey=calculateKey();
                console.log(">>>>> "+masterKey);
                console.log(">>>>> "+key);
                $scope.Masterkey=key;
                $scope.RegeneratedKey=masterKey;
               
                $scope.masterKey=masterKey;
                function calculateKey() {
                    return sum(mod);
                }

                function sum(mod)
                {
                    var sum = 0 ;
                    for(var k=0; k<n ; k++)
                    {
                        sum = sum + product(k , mod);
                    }
                    while(sum<0)
                    {
                        sum = sum+ mod;
                    }
                    return Math.trunc(sum % mod);
                }

                function product(x , mod)

                {
                    var p = array[x]*modinv(denominator(x), mod)*numerator(x);
                    return p;
                }

                function modinv(den, mod)
                {
                    if(den<0)
                    {
                        while(den<0)
                        {
                            den=den+mod;
                        }
                    }
                    den=den%mod;
                    var y=0;
                    for(var x=1;x<mod;x++)
                    {
                        if((den*x)%mod==1)
                        {
                            y=x;
                            break;
                        }

                    }
                    return y;
                }

                function numerator(key) {
                    var val= multiplication();
                    val= val/keys[key];
                    if(m%2==0)
                    {
                        return -val;
                    }
                    else{
                        return val;
                    }
                    return val;
                }

                function denominator(key)
                {
                    var mult=1;
                    for(var j=0;j<m;j++)
                    {
                        if(key!=j)
                        {
                            mult=mult*(keys[key]-keys[j]);
                        }
                    }
                    return mult;
                }

                function multiplication() {
                    var mul = 1;
                    for(var i =0; i<n; i++)
                    {
                        mul = mul*keys [i];
                    }
                    return mul;
                }
            }

        });


    }

}])
   
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
        shareUserName=username.substring(0, 8);
        /*console.log("Username:"+shareUserName+" Password:"+password);*/
        fbAuth.$signInWithEmailAndPassword(username,password).then(function(authData) {
            $state.go("menu.launchKeyGenerator");
		}).catch(function(error) {
            alert("UnAuthencated User");
        });
    }
    
    
    /*$scope.register = function(username, password) {
        fbAuth.$createUserWithEmailAndPassword(username,password).then(function(userData) {
            return fbAuth.$signInWithEmailAndPassword(username,
                password);
        }).then(function(authData) {
            alert("Successful")
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }*/
}])
   
MobileApp.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See 
function ($scope, $stateParams) {


}])