<?php
 header('Access-Control-Allow-Origin: *'); 
 header("Access-Control-Allow-Credentials: true");
 header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
 header('Access-Control-Max-Age: 1000');
 header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
$url = "https://client-api.mobinet.io/device/rotate?hash=M6L1jIpYJI5gmqLRxXIRXZacNDJQO0JuPhD6RWyJurq58-lVWL0As8bv6IjKC60D&api_key=tzjPwsq7VJli8dOHVHorfCjRnRBjqUGV";

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

// $headers = array(
//    "Authorization: Token 7e900b9e6e0d93df5fc975009937d0f1f92d5658",
// );
//for debug only!
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$resp = curl_exec($curl);
curl_close($curl);
echo $resp;

?>
