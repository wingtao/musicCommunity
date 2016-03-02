<?php

$dbconn = pg_connect("host=localhost port=5433 dbname=csu user=postgres password=123456");
if (!$dbconn) {
    echo "can not connect to dbserver";
    exit(0);
}
$searchText = $_REQUEST['search'];
$sql = "SELECT * FROM sing WHERE name ~* '$searchText'";        //匹配正则表达式，大小写无关

$result = pg_query($dbconn, $sql);

//$row = pg_fetch_row($result);
$column = pg_num_fields($result);
$j = 0;

echo"<h3>搜索结果如下：</h3>";
echo "<br/>";
echo "<table border='1px' >";
while ($row = pg_fetch_row($result)) {
    echo "<tr>";
    echo "<td class='lpl'>" . $j . "</td>";
    for ($i = 0; $i < $column; $i++) {
        if ($i == 1or$i == 2 || $i == 3) {
            echo "<td class='lp'>" . $row[$i] . "</td>";
        }
        if ($i == 0) {
            $Singlink = "http://localhost/musicCommunity/files/" . $row[$i + 5];
            echo "<td class='lp'><a class='singLink' href='$Singlink'>" . $row[$i] . "</a></td>";
        }
    }
    echo "</tr>";

    $j+=1;
}
echo"</table>";
pg_free_result($result);
pg_close($dbconn)
?>