<?php

$dbconn = pg_connect("host=localhost port=5433 dbname=csu user=postgres password=123456");
if (!$dbconn) {
    echo "can not connect to dbserver";
    exit(0);
}

$sql = "SELECT * FROM sing";

$result = pg_query($dbconn, $sql);
//$row = pg_fetch_row($result);
$column = pg_num_fields($result);
$j = 0;
while ($row = pg_fetch_row($result)) {
    echo "<tr>";
    echo "<td class='hp'>" . $j . "</td>";
    for ($i = 0; $i < $column; $i++) {
        if ($i == 1or$i == 2 || $i == 3) {
            echo "<td class='hp'>" . $row[$i] . "</td>";
        }
        if ($i == 0) {
            $Singlink = "http://localhost/musicCommunity/files/" . $row[$i + 5];
            echo "<td class='hp'><a class='singLink' href='$Singlink'>" . $row[$i] . "</a></td>";
        }
        if ($i == 4) {
            echo "<td class='hp'>" . "<a   onclick=Praise(this) id=" . $row[0] . " >赞(<span class=" . $row[0] . ">" . $row[$i] . "</span>)</a>" . "</td>";
        }
    }
    echo "</tr>";
    $j+=1;
}

pg_free_result($result);
pg_close($dbconn)
?>