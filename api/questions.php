<?php
//header('Content-type: application/json');

require_once 'mysql-connection.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $result = (object)array(
            'success' => true
        );
        $json = json_encode();
        break;
    case 'GET':
    default:
        $questions = array();

        $query = "SELECT * FROM question ORDER BY votes DESC";
        if ($result = mysqli_query($conn, $query)) {
            while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                $questions[] = (object)$row;
            }
        }

        $json = json_encode($questions);
}

mysqli_close($conn);

echo $json;