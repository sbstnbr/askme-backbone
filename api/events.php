<?php
header('Content-type: application/json');

$mysqli = new mysqli("localhost", "taw2013", "x2YfU8vHqAATS7Sh", "taw2013");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

if ($results = $mysqli->query('SELECT * FROM event ORDER BY start')) {
    $events = array();
    
    foreach ($results as $result) {
        $event = (object)array(
            'id' => $result['id'],
            'start' => $result['start'],
            'title' => $result['subject'],
            'attendees' => array()
        );
        
        if (!empty($result['end'])) {
            $event->end = $result['end'];
        }
        
        if (!empty($result['location'])) {
            $event->location = $result['location'];
        }
        
        if (!empty($result['description'])) {
            $event->description = $result['description'];
        }        

        $query = "SELECT u.* "
               . "FROM attendee a "
               . "INNER JOIN user u "
               . "ON a.enterprise_id = u.enterprise_id "
               . "WHERE event_id = {$event->id}";
               
        if ($resultsAtt = $mysqli->query($query)) {
            
            foreach ($resultsAtt as $resultAtt) {
                $event->attendees[] = (object)array(
                    'enterprise_id' => $resultAtt['enterprise_id'],
                    'first_name' => $resultAtt['first_name'],
                    'last_name' => $resultAtt['last_name'],
                );
            }
            
        }
        
        $events[] = $event;
    }
}

$mysqli->close();

echo json_encode($events);