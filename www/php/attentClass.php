<?php

include "config.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET["classID"]) && isset($_GET["studentID"]) ){
	if( !empty($_GET["classID"]) && !empty($_GET["studentID"]) ){

		$class_id = $_GET["classID"];
		$student_id = $_GET["studentID"];

		$sqlForClassPopulation = "SELECT population FROM class WHERE class_id=".$class_id;
		$resultForPopulation = $conn->query($sqlForClassPopulation);

		if ($resultForPopulation->num_rows > 0) {
			
    		while($rs = $resultForPopulation->fetch_assoc()) {
				$population = $rs['population'];	
			}
		}
		if($population != null){
			$dilimler = explode(",", $population);
			$dongu = true;
			$count = 0;
			for($i = 0;i<count($dilimler);$i++){
				if($dilimler[$i] == $student_id){
						$count++;
				}
			}
			if($count == 0){
			$population .= $student_id;
				}
		}else{
			$population = $student_id.",";
		}

		$sql="UPDATE class SET population='".$population."'WHERE class_id=".$class_id;	

		if($conn->query($sql) === TRUE) {
			echo "1";
		}else{
			echo "0";
		}	
	}
}

$conn->close();
	

?> 