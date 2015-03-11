<?php
$conn = mysqli_connect("localhost", "taw2013", "x2YfU8vHqAATS7Sh", "taw2013");
if (!$conn) {
    echo "Failed to connect to MySQL: (" . mysqli_connect_errno() . ") " . mysqli_connect_error();
}