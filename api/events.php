<?php
header('Content-type: application/json');

$conn = mysqli_connect("localhost", "taw2013", "x2YfU8vHqAATS7Sh", "taw2013");
if (!$conn) {
    echo "Failed to connect to MySQL: (" . mysqli_connect_errno() . ") " . mysqli_connect_error();
}

if ($result = mysqli_query($conn, 'SELECT * FROM event ORDER BY start')) {
    $events = array();
    
    while ($row = mysqli_fetch_array($result)) {
        $event = (object)array(
            'id' => $row['id'],
            'start' => $row['start'],
            'allDay' => (bool)$row['allDay'],
            'title' => $row['subject'],
            'attendees' => array()
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

        $query = "SELECT u.* "
               . "FROM attendee a "
               . "INNER JOIN user u "
               . "ON a.enterprise_id = u.enterprise_id "
               . "WHERE event_id = {$event->id}";
               
        if ($resultAttendee = mysqli_query($conn, $query)) {
            
            while ($rowAttendee = mysqli_fetch_array($resultAttendee)) {
                $event->attendees[] = (object)array(
                    'enterprise_id' => $rowAttendee['enterprise_id'],
                    'first_name' => $rowAttendee['first_name'],
                    'last_name' => $rowAttendee['last_name'],
                );
            }
            
        }
        
        $events[] = $event;
    }
}

mysqli_close($conn);

echo json_encode($events);