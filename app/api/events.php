<?php
header('Content-type: application/json');

require_once 'mysql-connection.php';

if ($result = mysqli_query($conn, "SELECT * FROM event ORDER BY start")) {
    $events = array();

    $colors = array(
        '' => '#DDD',
        'architecture' => '#CF9',
        'applications' => '#0B0F0',
        'cloud' => '#C9F',
        'nextgen' => '#C5D9F1',
        'emerging' => '#FF6',
        'mobile' => '#E6B8B7',
        'infrastructure' => '#FFC000'
    );

    while ($row = mysqli_fetch_array($result)) {
        $event = (object)array(
            'id' => $row['id'],
            'start' => $row['start'],
            'allDay' => (bool)$row['allDay'],
            'title' => $row['subject'],
            'presenters' => array(),
            'color' => $colors[$row['category']]
        );

        if (!empty($row['end'])) {
            $event->end = $row['end'];
        }

        if (!empty($row['location'])) {
            $event->location = $row['location'];
        }

        if (!empty($row['description'])) {
            $event->description = $row['description'];
        }

        $query = "SELECT * "
               . "FROM presenter "
               . "WHERE event_id = {$event->id}";

        if ($resultAttendee = mysqli_query($conn, $query)) {

            while ($rowAttendee = mysqli_fetch_array($resultAttendee)) {
                $event->presenters[] = (object)array(
                    'name' => $rowAttendee['name']
                );
            }
        }

        $events[] = $event;
    }
}

mysqli_close($conn);

echo json_encode($events);