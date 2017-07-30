<?php

include "config.php";

$studentRegisterData = json_decode(file_get_contents("php://input"));	
$firstName = $studentRegisterData->firstName;
$lastName = $studentRegisterData->lastName;
$email = $studentRegisterData->email;
$password = $studentRegisterData->pass;
$registerDate = "123";

$sql = "INSERT INTO student (student_fName, student_lName, student_email,student_pass,studentRegister_date) VALUES  ('$firstName','$lastName','$email','$password','$registerDate')";

if($conn->query($sql) == TRUE) {
	echo "1";
}else{
	echo "2";
}

$conn->close();

?>