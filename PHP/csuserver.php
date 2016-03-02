<?php

include_once './Server.php';
include_once './UserServer.php';

$request = $_REQUEST["request"];
$reqjson = json_decode($request);

$type = $reqjson->type;
$t = split("_", $type)[0];

$sv = new Server();

if ($t === "USER") {
    $sv = new UserServer();
//}else if ($t === "MESSAGE"){
//    $sv = new MessageServer();
}
$sv->setRequest($reqjson);
$sv->run();


echo json_encode($sv->getResponse());
?>
