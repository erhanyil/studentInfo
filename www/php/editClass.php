<?php

include "config.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
if(isset($_GET["class_name"]) && isset($_GET["class_id"])){
	if( !empty($_GET["class_name"]) && !empty($_GET["class_id"])){
		$class_name = $_GET["class_name"];
		$class_id = $_GET["class_id"];
		$sql="UPDATE class SET class_name= '".$class_name."' WHERE class_id=".$class_id;
		$result = $conn->query($sql);
		if($conn->query($sql) == TRUE) {
			echo "0";
		}else{
			echo "2";
		}
		$conn->close();
	}
}
?> 