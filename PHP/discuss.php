
<?php

//include_once './DBConfig.php';

$dbconn = pg_connect("host=localhost port=5433 dbname=csu user=postgres password=123456");
if (!$dbconn) {
    echo "can not connect to dbserver";
    exit(0);
}

$comment = $_REQUEST["comment"];
$stri = json_decode($comment);

$sql = 'INSERT INTO comment (id,commenttext,time) values($1,$2,$3)';
$result = pg_query_params($dbconn, $sql, array(
    $stri->username,
    $stri->comment,
    $stri->commentTime
        ));

if (!$result) {
    $res = array(
        "success" => false,
        "message" => pg_last_error($dbconn)
    );
} else {
    $res = array(
        "success" => true,
        "message" => "ok"
    );
}
pg_free_result($result);

echo json_encode($res);
pg_close($dbconn)
?>