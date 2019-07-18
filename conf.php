<?php

    define('HOST','localhost');
    define('USER','root');
    define('PASS','123456');
    define('DB','student');
    $con = mysqli_connect(HOST,USER,PASS,DB);
    if(!$con){
        die("Connection failed: " . mysqli_connect_error());
    }else{
        echo "PASS!!";
    }

?>