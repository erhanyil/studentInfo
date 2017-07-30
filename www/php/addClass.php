<?php

include "config.php";

$class_data = json_decode(file_get_contents("php://input"));
$class_name = $class_data->class_name;
$teacher_id = $class_data->teacher_id;

$sql = "INSERT INTO class (teacher_id, class_name, population, message_count) VALUES ($teacher_id,'$class_name','','0')";

if($conn->query($sql) == TRUE) {
	echo "0";
}else{
	echo "1";
}

$conn->close();

?>
