<?php
//header('Content-type: application/json');

require_once 'mysql-connection.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        break;
    case 'GET':
    default:
}

mysqli_close($conn);