<?php
include './sql_connect.php';
//更新对应的文章的点赞数据
$sql_update = "UPDATE routes SET attend = attend+1 WHERE _id =" . "'" . $_GET['id'] . "'";
$update_result = mysqli_query($connect, $sql_update);
$sql = "INSERT INTO attend (route_id,user_id) VALUES ('" . $_GET['id'] . "','" . $_SESSION['user_id'] . "')";
$result = mysqli_query($connect,$sql);
if ($result && $update_result){
  header("HTTP/1.1 200 OK");
  echo true;
}else{
  header("HTTP/1.1 500 Internal Server Error");
  echo "数据库操作出错！";
}
?>