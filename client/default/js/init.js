/**
 *  Push services settings for Blackberry. You need to register your app to use Blackberry's Push Service. See https://www.blackberry.com/profile/?eventId=8121 for details. 
 *  You don't need those value if the app doesn't need to be run on Blackberry.
 */
var bb_push_port = "30308";
var bb_push_appId = "80303-s67ll735e3D0576O61a27D6441h63l6476";
var bb_push_serverUrl = "http://pushapi.eval.blackberry.com";

$fh.ready({}, function(){
  /**
   *  Receive action has to be called first inside $fh.ready otherwise it may not be able to receive the push message that is passed to the app.
   */
  $fh.push({act:'receive'}, function(notification){
    receive_push(notification);
  }, function(err){
  })
});


/**
 *  Callback function when a notificaton message is received. 
 *  See http://docs.feedhenry.com/reference-docs/api-reference/push-notification/ for the format of the notification message.
 */
var receive_push = function (notification) {
    var msg = '';
    for (var property in notification) {
        msg += property + ' : ' + notification[property] + '<br>';
    }
    message.innerHTML='notification received:<br><br>' + msg;
};

/**
 *  Register the app for push notification service. Based on the platform, the user maybe prompted for the permission to allow the app to use push notification service.
 */
function registerAPN() {
    registerButton.disabled=true;
    result.innerHTML='Registering...';
    
    /**
     *  The "params" can be empty object if the app is not going to run on Blackberry
     */
    $fh.push({act:'register', params:{bb:{port:bb_push_port, appId:bb_push_appId, serverUrl: bb_push_serverUrl}}}, successCallback, errorCallback);
}

/**
 * Success callback function when the app has registered for push notification on device. 
 * A unique id will be returned from the device and it should be send to the server to register the device with Urbanairship. 
 */
function successCallback(e) {
  result.innerHTML="Device registered. Device token:<br>" + (e.deviceToken || e.devicePIN || e.apid) + '.<br><br>';
  result.innerHTML += "Now registering with UrbanAirship...<br>";
  e.ts = new Date().getTime();
  $fh.act({act:'registerUA', req:e}, function(res){
    if(res.result == 'ok'){
      result.innerHTML += "Registration Finishied.<br>";
    } else {
      result.innerHTML += "Error when registering with UrbanAirship.<br>";
    }
  })
}

/**
 * Error callback function is the app failed to register push notification.
 */
function errorCallback(e) {
    alert(e);
    result.innerHTML='Error during registration: ' + e;
    registerButton.disabled=false;
}

/**
 * Call server side function to send a push notification message.
 */
function broadcastMessage(){
  $fh.act({act:'pushMessages', req:{ts: new Date().getTime()}}, function(res){
    result.innerHTML += "Message sent";
  })
}