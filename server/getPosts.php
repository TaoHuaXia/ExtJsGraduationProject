<?php
/**
 * Created by PhpStorm.
 * User: wangyihua
 * Date: 2017/4/11
 * Time: 10:17
 */
include './sql_connect.php';
$sql = 'SELECT * FROM posts';
$sql_hot = 'SELECT * FROM posts ORDER BY reply DESC limit 0,5';
$result = mysqli_query($connect,$sql);
$result_hot = mysqli_query($connect,$sql_hot);
if($result && $result_hot){
  $row = mysqli_fetch_all($result,MYSQLI_ASSOC);
  $row_hot = mysqli_fetch_all($result_hot,MYSQLI_ASSOC);
  header('HTTP/1.1 200 OK');
  $array= array('posts'=>$row,'hots'=>$row_hot);
  echo json_encode($array);
}else{
  header(("HTTP/1.1 500 ServerError"));
  echo '数据库查询出错';
}

