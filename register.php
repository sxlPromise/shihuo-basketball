<?php
    header("Content-type:text/html;charset=utf-8");
	/*
		设置一个统一的返回格式
    */
    $responseData = array("code" => 0, "message" => "");
    /* 
        取出post提交过来的数据
    */
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $phonenumber = $_POST['phonenumber'];
    $createTime = $_POST['createTime'];


    /* 
        注册
    */
    $link = mysql_connect("localhost","root","123456");
    if(!$link){
        $responseData["code"] = 1;
        $responseData["message"] = "服务器忙";
        echo json_encode($responseData);
        exit;
    }
    mysql_set_charset("utf8");

    mysql_select_db("qd1908");

    //准备sql语句  判断数据库是否有同名用户名
    $sql = "SELECT * FROM shihuo_users WHERE username='{$username}'";
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
    if($row){
        $responseData["code"] = 2;
        $responseData["message"] = "用户名已注册";
        echo json_encode($responseData);
        exit;
    }

    //密码要进行md5加密
    $str = md5(md5(md5($password)."qianfeng")."qingdao");

    //注册
    $sql = "INSERT INTO shihuo_users(username,password,phone,creat_time) VALUES('{$username}','{$str}',{$phonenumber},{$createTime})";

    $res =mysql_query($sql);
    if(!$res){
        $responseData["code"] = 3;
        $responseData["message"] = "服务器忙";
        echo json_encode($responseData);
        exit;
    }else{
        $responseData["message"] = "注册成功";
		echo json_encode($responseData);
    }

    mysql_close($link);
?>