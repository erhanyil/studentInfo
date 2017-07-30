<?php

include "config.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


if(isset($_GET["teacher_id"]) && isset($_GET["class_id"]) ){
	if( !empty($_GET["teacher_id"])  && !empty($_GET["class_id"])  ){

		$teacher_id=$_GET["teacher_id"];
		$class_id=$_GET["class_id"];

		$sql="DELETE FROM class WHERE class_id = ".$class_id." and teacher_id = ".$teacher_id;
		if($conn->query($sql) == TRUE){
      $sql="DELETE FROM message WHERE class_id = ".$class_id." and teacher_id = ".$teacher_id;
      if($conn->query($sql) == TRUE){
        echo "0";
      }else{
        echo "1";
      }
		}else{
			echo "2";
		}
  }
}
$conn->close();


?>
