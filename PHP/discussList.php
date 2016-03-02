<?php

$dbconn = pg_connect("host=localhost port=5433 dbname=csu user=postgres password=123456");
if (!$dbconn) {
    echo "can not connect to dbserver";
    exit(0);
}
$sql = "SELECT * FROM comment";

$result = pg_query($dbconn, $sql);
//$row = pg_fetch_row($result);
$column = pg_num_fields($result);
$j = 0;
while ($row = pg_fetch_row($result)) {
    echo "<tr>";
    echo "<td class='hp'>" . $j . "</td>";
    for ($i = 0; $i < $column; $i++) {
        if ($i == 1) {
            echo "<td class='hp' id='comment-content'>" . $row[$i] . "</td>";
        } else {
            echo "<td class='hp'>" . $row[$i] . "</td>";
        }
    }
    echo "</tr>";
    $j+=1;
}

pg_free_result($result);
pg_close($dbconn)
?>