<?php
/**
 * Created by PhpStorm.
 * User: wangyihua
 * Date: 2017/3/7
 * Time: 14:26
 */
$LOCATION = 'localhost:3306';
$USER_NAME= 'root';
$PASSWORD='123456';
$DB_NAME='kuyoo&admin';
$connect = mysqli_connect($LOCATION, $USER_NAME, $PASSWORD, $DB_NAME )or die(mysqli_connect_error());
mysqli_query($connect,"set names ’utf8’ ");
session_start();
?>

