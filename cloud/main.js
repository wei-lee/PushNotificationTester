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
  $fh.log({message: 'receive device id : ' + deviceId});
  var res = $fh.push({'act':'register', 'type':'dev', 'params':{'id':deviceId, 'platform':platform}});
  $fh.log({'message':'UA register response : ' + $fh.stringify(res)});
  return res;
}

function pushMessages(){
  var message = "hello from FH";
  var ios_message = {'aps':{'alert':message}};
  var android_message = {'android':{'alert':message}};
  var blackberry_message = {'blackberry':{'content-type':'text/plain', 'body':message}};
  var res_ios = $fh.push({'act':'broadcast', 'type':'dev', 'params':ios_message});
  $fh.log({'message':'res for ios broadcast: ' + $fh.stringify(res_ios)});
  var res_android = $fh.push({'act':'broadcast', 'type':'dev', 'params':android_message});
  $fh.log({'message':'res for android broadcast: ' + $fh.stringify(res_android)});
  return {'result': 'ok'};
}