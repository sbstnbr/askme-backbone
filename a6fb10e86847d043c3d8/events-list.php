<?php
    header('Content-Type: text/html; charset=UTF-8');
    require_once '../api/mysql-connection.php';
?>
<!DOCTYPE html>
<head>
    <link rel="stylesheet" href="../css/fonts.css" />
    <link rel="stylesheet" href="../css/foundation.css" />
    <style>
        body {
            padding: 3em 5ex;
        }

        ul {
            list-style: none;
        }

        li {
            margin-top: 0.75em;
        }

        .addEvent {
            margin-top: 2em;
        }
    </style>
</head>
<body>
    <header>
        <h1>Events</h1>
    </header>
    <ul>
    <?php
        if ($result = mysqli_query($conn, "SELECT * FROM event ORDER BY start")) {
            $events = array();

            while ($row = mysqli_fetch_array($result)) {
                $event->id = $row['id'];
                $event->start = $row['start'];
                $event->allDay = (bool)$row['allDay'];
                $event->title = $row['subject'];

                if (!empty($row['end'])) {
                    $event->end = $row['end'];
                }

                if (!empty($row['location'])) {
                    $event->location = $row['location'];
                }

                if (!empty($row['description'])) {
                    $event->description = $row['description'];
                }
    ?>
        <li><a href="edit-event.php?id=<?php echo $row['id']; ?>"><?php echo $row['subject']; ?></a></li>
    <?php
            }
        }
        mysqli_close($conn);
    ?>
        <li class="addEvent"><a href="edit-event.php">+ Add event</a></li>
    </ul>
</body>