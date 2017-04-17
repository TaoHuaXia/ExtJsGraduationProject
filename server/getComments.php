<?php
/**
 * Created by PhpStorm.
 * User: wangyihua
 * Date: 2017/4/13
 * Time: 17:30
 */
include './sql_connect.php';
if($_GET['type'] == 'redirect'){
  //如果是点击文章标题，则存储用户id以及相应的帖子id，便于之后使用
  $_SESSION['post_id']=$_GET['id'];
  $_SESSION['poster_id']=$_GET['poster'];
  $id=$_GET['id'];
  $sql = "UPDATE posts SET browse = browse+1 WHERE _id='$id'";
  $result = mysqli_query($connect,$sql);
  echo true;
}else{
  //根据之前存储的post_id查询帖子的信息以及帖子相关的所有的comments
  $sql = "SELECT * FROM comments WHERE post_id ='".$_SESSION['post_id']."' ORDER BY createdAt";
  $sql_post = "SELECT * FROM posts WHERE _id ='".$_SESSION['post_id']."'";
  $result = mysqli_query($connect,$sql);
  $result_post = mysqli_query($connect,$sql_post);
  if( $result && $result_post ){
    $row = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $row_post = mysqli_fetch_array($result_post,MYSQLI_ASSOC);
    header("HTTP/1.1 200 OK ");
    echo json_encode(array('post'=>$row_post,'comments'=>$row,'poster_id'=>$_SESSION['poster_id']));
  }else{
    header("HTTP/1.1 500  ");
    echo '数据库查询出错！';
  }
}
?>