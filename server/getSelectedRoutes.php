<?php
/**
 * Created by PhpStorm.
 * User: wangyihua
 * Date: 2017/4/6
 * Time: 11:55
 */
include './sql_connect.php';
$sql = "SELECT * FROM routes ORDER BY attend DESC";
if($result = mysqli_query($connect, $sql)){
  header("HTTP/1.1 200 OK");
  $row = mysqli_fetch_all($result,MYSQLI_ASSOC);
  $array = array('success'=>true,'data' => $row);
  echo json_encode($array);
}else{
  header("HTTP/1.1 500 Internal Server Error");
  echo '数据库查询出错！';
}

