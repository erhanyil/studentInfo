<?php

$servername = "localhost";
$database = "transfree";
$username = "root";
$password = "";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
	die("0");
}

?> 