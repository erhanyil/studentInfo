<?php

include "config.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
if(isset($_GET["student_id"]) && isset($_GET["class_id"]) && isset($_GET["message_ok"])&& isset($_GET["message_id"])){
	if( !empty($_GET["student_id"]) && !empty($_GET["class_id"]) && !empty($_GET["message_ok"])&& !empty($_GET["message_id"])){
		$student_id = $_GET["student_id"];
		$class_id = $_GET["class_id"];
		$message_id = $_GET["message_id"];
		$message_ok = $_GET["message_ok"];
		if($message_ok == ","){
			$message_ok = $student_id.",";	
		}else{
			$message_ok = $message_ok.$student_id;
		}
		$sql = "UPDATE message SET message_ok ='".$message_ok."' WHERE class_id = ".$class_id." AND  message_id <=".$message_id;
		if($conn->query($sql) == TRUE) {
			echo "1";
		}else{
			echo "2";
		}
		$conn->close();
	}
}
?> 