
<?php

define('ROOT', dirname(__FILE__) . '/');

$dbconn = pg_connect("host=localhost port=5433 dbname=csu user=postgres password=123456");
if (!$dbconn) {
    echo "can not connect to dbserver";
    exit(0);
}


$picname = $_FILES['mypic']['name'];
$picsize = $_FILES['mypic']['size'];

if ($picname != "") {
    if ($picsize > 20971520) { //限制上传大小
        $arr = array(
            'success' => false,
            'message' => "大小不能超过20m！"
        );
        echo json_encode($arr);

        exit;
    }
    $type = strstr($picname, '.'); //限制上传格式
    if ($type != ".mp3" && $type != ".wma" && $type != ".wav" && $type != ".asf" && $type != ".aac" && $type != ".flac") {
        $arr = array(
            'success' => false,
            'message' => "格式不对！"
        );
        echo json_encode($arr);

        exit;
    }
    $picname1 = iconv("UTF-8", "gb2312", $_FILES['mypic']['name']);

    $picname2 = substr($picname1, 0, strrpos($picname1, '.'));      // picname2返回到界面 需转换格式
    $picname3 = substr($picname, 0, strrpos($picname, '.'));        // picname3插入数据库 无需转换格式
    $sing_id = $_REQUEST['username'];
    $time = $_REQUEST['time'];
    if ($sing_id == "") {
        $arr = array(
            'success' => false,
            'message' => "请先登录！"
        );
        echo json_encode($arr);
        exit;
    }
    $rand = rand(100, 999);
    $pics = date("YmdHis") . $rand . $type; //命名名称
    //上传路径
    $file_path = './files/';
    if (!is_dir($file_path)) {
        mkdir($file_path);
    }
    $stored_path = ROOT . $file_path . $pics;

    //$pic_path = "files/" . $pics;

    $sing_size = $_FILES['mypic']['size'];
    $sing_number = 0;



    if (file_exists($file_path)) {
        if (is_uploaded_file($_FILES['mypic']['tmp_name'])) {
            $bool = move_uploaded_file($_FILES['mypic']['tmp_name'], $stored_path);
            if (!$bool) {
                $arr = array(
                    'success' => false,
                    'message' => "上传失败！"
                );
                echo json_encode($arr);
                exit;
            }
        }
    }
}
$size = round($picsize / ( 1024 * 1024), 2); //转换成m





$sql = 'INSERT INTO sing (name,id,size,time,number,filename) values($1,$2,$3,$4,$5,$6)';

$result = pg_query_params($dbconn, $sql, array(
    $picname3,
    $sing_id,
    $size,
    $time,
    $sing_number,
    $pics
        ));
if ($result) {
    $arr = array(
        'name' => $picname3,
        'pic' => $pics,
        'size' => $size,
        'success' => true,
        'message' => "it has inserted"
    );
} else {
    $arr = array(
        'name' => $picname3,
        'pic' => $pics,
        'size' => $size,
        'success' => false,
        'message' => pg_last_error($dbconn)
    );
}
pg_free_result($result);
pg_close($dbconn);

echo json_encode($arr); //输出json数据
?>
  