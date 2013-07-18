<?php
header('Content-type: application/json');

require_once 'mysql-connection.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $result = (object)array(
            'success' => false
        );

        $data = json_decode(file_get_contents('php://input'));
        $question = trim($data->question);

        if ($question) {
            $question = mysqli_real_escape_string(
                $conn,
                htmlspecialchars($question)
            );

            $query = "INSERT INTO question (question) VALUES ('{$question}')";
            if (mysqli_query($conn, $query)) {
                $result->success = true;
                $result->id = mysqli_insert_id($conn);
            }
        }

        $json = json_encode($result);
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