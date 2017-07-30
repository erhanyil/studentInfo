<?php

include "config.php";

$messageData = json_decode(file_get_contents("php://input"));
$sendingMessage = $messageData->sendingMessage;
$class_id = $messageData->class_id;
$teacher_id = $messageData->teacher_id;
date_default_timezone_set('Europe/Istanbul');
$date = date('H:i');

$sql = "INSERT INTO message (teacher_id, class_id, message, message_ok,message_date) VALUES  ('$teacher_id','$class_id','$sendingMessage',',','$date')";

$message_count="";

if($conn->query($sql) == TRUE) {
	$sql = "UPDATE class SET message_count = message_count + 1 WHERE class_id='$class_id' and teacher_id='$teacher_id'";
		if($conn->query($sql) == TRUE){
			echo "1";
		}

}else{
	echo "2";
}

$conn->close();

?>
