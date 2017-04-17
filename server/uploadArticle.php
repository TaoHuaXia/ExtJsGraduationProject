<?php
 include './sql_connect.php';
$path = "../web/static/image/".$_FILES['photo']['name'];
$showPath="static/image/".$_FILES['photo']['name'];
move_uploaded_file($_FILES['photo']['tmp_name'],$path);
$time = date("Y-m-d H:i:s",time());
$sql = "INSERT INTO article (_id,title,author,createdAt,photo,text,tag,description) VALUES (1304,'".$_POST['title']."','".$_POST['author']."','$time','$showPath','".$_POST['content']."','河南','".$_POST['describe']."')";
if($result = mysqli_query($connect, $sql)){
  $array = array('success'=> true);
}else{
  $array = array('success'=> false,'message'=>$sql);
}
echo json_encode($array);
?>