<?php

include "config.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
		$sql="";
		if(empty($_GET['teacher_id'])){
			$sql="SELECT * FROM class";
		}else{
			$sql="SELECT * FROM class WHERE teacher_id=".$_GET['teacher_id'];
		}
		$result = $conn->query($sql);
		$outp = "";
		if ($result->num_rows > 0) {
    	while($rs = $result->fetch_assoc()) {
    		$sqlTeacher = "SELECT * FROM teacher WHERE teacher_id =".$rs["teacher_id"];
    		$resultTeacher = $conn->query($sqlTeacher);
    		if($resultTeacher->num_rows > 0){
    			while ($tt = $resultTeacher->fetch_assoc()) {
    				if ($outp != "") {$outp .= ",";}
    				$outp .= '{"class_id":"'.$rs["class_id"].'",';
					$outp .= '"teacher_fName":"'.$tt["teacher_fName"].'",';
					$outp .= '"teacher_id":"'.$tt["teacher_id"].'",';
					$outp .= '"message_count":"'.$rs["message_count"].'",';
					$outp .= '"class_name":"'.$rs["class_name"].'",';
					$outp .= '"population":"'.$rs["population"].'"}';	
    			}
    		}				
		}
	}	
	$outp ='{"records":['.$outp.']}';
	$conn->close();

	echo($outp);
	

?> 