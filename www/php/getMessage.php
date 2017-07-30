<?php

include "config.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
if(isset($_GET["classID"]) && isset($_GET["teacherID"])){
	if( !empty($_GET["classID"]) && !empty($_GET["teacherID"])){
		$classID = $_GET["classID"];
		$teacherID = $_GET["teacherID"];
		$sql="SELECT m.message_id,c.class_name,c.population,t.teacher_fName,m.message,m.message_ok,m.message_date FROM teacher as t INNER JOIN class as c ON t.teacher_id=c.teacher_id INNER JOIN message as m ON c.class_id = m.class_id WHERE c.class_id=".$classID." and t.teacher_id=".$teacherID." ORDER BY m.message_id DESC";
		$result = $conn->query($sql);
		$outp = "";
		
		if ($result->num_rows > 0) {
    	while($rs = $result->fetch_assoc()) {
				if ($outp != "") {$outp .= ",";}
				$outp .= '{"message_date":"'.$rs["message_date"].'",';
				$outp .= '"class_name":"'.$rs["class_name"].'",';
				$outp .= '"population":"'.$rs["population"].'",';
				$outp .= '"teacher_fName":"'.$rs["teacher_fName"].'",';
				$outp .= '"message":"'.$rs["message"].'",';
				$outp .= '"message_id":"'.$rs["message_id"].'",';
				$outp .= '"bluestack":"false",';
				$outp .= '"message_ok":"'.$rs["message_ok"].'"}';
			}
		}
		$outp ='{"messages":['.$outp.']}';
		$conn->close();

		echo($outp);
	}
}
?> 