<?php

include "config.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


if(isset($_GET["e"]) && isset($_GET["p"]) ){
	if( !empty($_GET["e"])  && !empty($_GET["p"])  ){

		$username=$_GET["e"];
		$password=$_GET["p"];

		/*
		student_id
		student_fName
		student_lName
		student_email
		student_pass
		studentRegister_date
		*/

		$sql="SELECT * FROM student where student_email = '".$username."' and student_pass = '".$password."'";
		$result = $conn->query($sql);
		$outp = "";

		if ($result->num_rows > 0) {
    	while($rs = $result->fetch_assoc()) {
				if ($outp != "") {$outp .= ",";}
				$outp .= '{"student_id":"'.$rs["student_id"].'",';
				$outp .= '"student_fName":"'.$rs["student_fName"].'",';
				$outp .= '"student_lName":"'.$rs["student_lName"].'",';
				$outp .= '"student_email":"'.$rs["student_email"].'",';
				$outp .= '"student_pass":"'.$rs["student_pass"].'",';
				$outp .= '"studentRegister_date":"'.$rs["studentRegister_date"].'"}';
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
