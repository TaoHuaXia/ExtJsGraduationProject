<?php
/**
 * Created by PhpStorm.
 * User: wangyihua
 * Date: 2017/4/1
 * Time: 11:46
 */
include './sql_connect.php';
//根据文章以及用户ID查出相应的文章的信息以及报名信息
$sql = "SELECT * FROM routes WHERE _id ='". $_GET['id']."'";
$sql_leader = "SELECT * FROM leaders WHERE _id ='". $_GET['leaderId']."'";
$sql_attend = "SELECT * FROM attend WHERE route_id ='".$_GET['id']."' AND user_id = '".$_SESSION['user_id']."'";
$result = mysqli_query($connect, $sql);
$result_leader = mysqli_query($connect, $sql_leader);
$result_attend = mysqli_query($connect, $sql_attend);
if($result && $result_attend && $result_leader){
  $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
  $data = mysqli_fetch_array($result_attend,MYSQLI_ASSOC);
  $leader = mysqli_fetch_array($result_leader,MYSQLI_ASSOC);
  header("HTTP/1.1 200 OK");
  $arr = array('data'=> $row,'attend' => $data,'leader'=>$leader);
  echo json_encode($arr);
}else{
  header("HTTP/1.1 500 Internal Server Error");
  echo "数据库操作出错！";
}
