<?php
header('Content-type: application/json');

require_once 'mysql-connection.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
    case 'PUT':
        $response = (object)array(
            'success' => false
        );

        $data = json_decode(file_get_contents('php://input'));

        if ($data->action === 'vote' && preg_match('/^\d+$/', $data->id)) {
            $queryUpdate = "UPDATE question SET votes = votes + 1 WHERE id = {$data->id}";
            $querySelect = "SELECT id, votes FROM question WHERE id = {$data->id}";
            if (mysqli_query($conn, $queryUpdate) && $result = mysqli_query($conn, $querySelect)) {
                $row = mysqli_fetch_row($result);
                $response->success = true;
                $response->id = $row[0];
                $response->votes = $row[1];
            }
        } else {
            $question = trim($data->question);

            if ($question) {
                $question = mysqli_real_escape_string(
                    $conn,
                    htmlspecialchars($question)
                );

                $query = "INSERT INTO question (question) VALUES ('{$question}')";
                if (mysqli_query($conn, $query)) {
                    $response->success = true;
                    $response->id = mysqli_insert_id($conn);
                }
            }
        }

        $json = json_encode($response);
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