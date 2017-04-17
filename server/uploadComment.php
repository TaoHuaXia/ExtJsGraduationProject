<?php
/**
 * Created by PhpStorm.
 * User: wangyihua
 * Date: 2017/4/14
 * Time: 15:02
 */
include './sql_connect.php';

$num = mt_rand(0,1000);//comments_id 随机数
$time = date("Y-m-d H:i:s",time());//发表的时间(格式化)
$content = $_POST['content'];//填写的内容
//提取session内的信息
$author=$_SESSION['user'];
$author_id=$_SESSION['user_id'];
$post_id=$_SESSION['post_id'];
//插入信息
$sql = "INSERT INTO  comments (_id,post_id,author,author_id,content,createdAt) VALUES ('$num','$post_id','$author','$author_id','$content','$time')";
$sql_update = "UPDATE posts SET reply = reply+1 WHERE _id='$post_id'";
$result = mysqli_query($connect,$sql);
$result_update = mysqli_query($connect,$sql_update);
if($result && $result_update){
  //成功直接将展示用的信息返回
  header('HTTP/1.1 200 OK');
  echo json_encode(array('content'=>$content,'author'=>$author,'time'=>$time,'author_id'=>$author_id,'poster_id'=>$_SESSION['poster_id']));
}else{
  header('HTTP/1.1 500 ERROR');
  echo '数据库操作出错';
}