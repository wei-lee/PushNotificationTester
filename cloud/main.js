/**
 * Register a device to Urbanairship
 */
function registerUA(){
  var deviceId, platfrom;
  if($params.deviceToken){
    deviceId = $params.deviceToken;
    platform = "ios";
  } else if($params.devicePIN){
    deviceId = $params.devicePIN;
    platform = "blackberry";
  } else if($params.apid){
    deviceId = $params.apid;
    platform = "android";
  }
  /**
   * Urbanairship API supports tagging a device. 
   * To do that, you can pass an extra parameter called "data" with the content specified in http://urbanairship.com/docs/push.html#registration
   */
  var res = $fh.push({'act':'register', 'type':'dev', 'params':{'id':deviceId, 'platform':platform}});
  return res;
}

function pushMessages(){
  var message = "hello from FH";
  /**
   * Broadcast a message to all the devices. 
   * The format for each platform is different. See http://urbanairship.com/docs/ for API details for each platform.
   */
  var ios_message = {'aps':{'alert':message}};
  var android_message = {'android':{'alert':message}};
  var blackberry_message = {'blackberry':{'content-type':'text/plain', 'body':message}};
  var res_ios = $fh.push({'act':'broadcast', 'type':'dev', 'params':ios_message});
  var res_android = $fh.push({'act':'broadcast', 'type':'dev', 'params':android_message});
  return {'result': 'ok'};
}