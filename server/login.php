<?php
include 'sql_connect.php';

$sql = "SELECT pwd,_id,auth FROM user WHERE name="."'".$_POST['account']."'";
$result = mysqli_query($connect,$sql);
if ($row = mysqli_fetch_array($result)) {
  if ($row['pwd'] == $_POST['password']) {
    $array = array('success' => true, 'message' => "登陆成功",'user'=>$_POST['account'],'id'=>$row['_id'],'type'=>$row['auth']);
    $_SESSION['user'] = $_POST['account'];
    $_SESSION['user_id'] = $row['_id'];
  } else {
    $array = array('success' => false, 'message' => "密码错误！");
  }
  echo json_encode($array);
}else{
  $array = array('success' => false, 'message' => "账号不存在！");
  echo json_encode($array);
}

?>
