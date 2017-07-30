<?php

include "config.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


if(isset($_GET["e"]) && isset($_GET["p"]) ){
	if( !empty($_GET["e"])  && !empty($_GET["p"])  ){
	
		$username=$_GET["e"];
		$password=$_GET["p"];

		
		$sql="SELECT * FROM teacher where teacher_email = '".$username."' and teacher_pass = '".$password."'";
		$result = $conn->query($sql);
		$outp = "";	
		
		if ($result->num_rows > 0) {
    	while($rs = $result->fetch_assoc()) {
				if ($outp != "") {$outp .= ",";}
				$outp .= '{"teacher_id":"'.$rs["teacher_id"].'",';
				$outp .= '"teacher_fName":"'.$rs["teacher_fName"].'",';
				$outp .= '"teacher_lName":"'.$rs["teacher_lName"].'",';
				$outp .= '"teacher_email":"'.$rs["teacher_email"].'",';
				$outp .= '"teacher_pass":"'.$rs["teacher_pass"].'",';
				$outp .= '"teacherRegister_date":"'.$rs["teacherRegister_date"].'"}';
			}
			$outp ='{"records":['.$outp.']}';
			echo($outp);
		}else{
			echo "1";
		}
		$conn->close();
		

		
	}
}

?> 