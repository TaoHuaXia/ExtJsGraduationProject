<?php
include './sql_connect.php';
if(isset($_SESSION['user_id'])){
  $_SESSION['routes_page'] =0;
  $limit = $_SESSION['routes_page'];
  $sql = "SELECT * FROM routes limit $limit,5 ";
  $result = mysqli_query($connect, $sql);
  if($row = mysqli_fetch_all($result,MYSQLI_ASSOC)){
    header("HTTP/1.1 200 OK");
    $array = array('success' => true,'data'=>$row);
    echo json_encode($array);
  }else{
    header("HTTP/1.1 500 Internal Server Error");
    echo "数据库查询出错！";
  }
}else{
  $array = array('success' => false);
  echo json_encode($array);
}

?>