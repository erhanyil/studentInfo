<?php

include "config.php";

$teacherRegisterData = json_decode(file_get_contents("php://input"));	
$teacherCode = $teacherRegisterData->teacherCode;
$firstName = $teacherRegisterData->firstName;
$lastName = $teacherRegisterData->lastName;
$email = $teacherRegisterData->email;
$password = $teacherRegisterData->pass;
$registerDate = "123";

$sql = "INSERT INTO teacher (teacher_code,teacher_fName, teacher_lName, teacher_email,teacher_pass,teacherRegister_date) VALUES  ('$teacherCode','$firstName','$lastName','$email','$password','$registerDate')";
	
if($conn->query($sql) == TRUE) {
	echo "1";
}else{
	echo "2";
}

$conn->close();

?>