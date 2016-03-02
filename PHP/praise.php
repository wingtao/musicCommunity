<?php

$dbconn = pg_connect("host=localhost port=5433 dbname=csu user=postgres password=123456");
if (!$dbconn) {
    echo "can not connect to dbserver";
    exit(0);
}
$songname = $_REQUEST['songname'];
$sql = "UPDATE sing SET number=number+1 WHERE name = '$songname'";

if (!$result = pg_query($dbconn, $sql)) {
    $re = array(
        result => "fail",
        message => $songname
    );
} else {
    $re = array(
        result => "success",
        message => $songname
    );
}
echo json_encode($re);

pg_free_result($result);
pg_close($dbconn)
?>