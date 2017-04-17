<?php
include 'sql_connect.php';

$sql = "SELECT * FROM user WHERE name="."'".$_POST['account']."'";
$insert_sql = "INSERT INTO user (_id,name,pwd) VALUES('1703',"."'".$_POST['account']."'".","."'".$_POST['password']."'".")";


$result = mysqli_query($connect,$sql);
if (mysqli_fetch_array($result)) {
  $array = array('success' => false, 'message' => "账号已存在");
  echo json_encode($array);
}else{
  if(mysqli_query($connect,$insert_sql)){
    $array = array('success' => true, 'message' => '注册成功,页面跳转中....');
  }else{
    $array = array('success' => false, 'message' => "数据库出错，请重试后联系管理员");
  }
  echo json_encode($array);
}
?>
