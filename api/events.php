<?php
header('Content-type: application/json');

$events = array(
    (object)array(
        'title' => 'Event 1',
        'start' => '2013-07-09T08:00:00-05:00',
        'end' => '2013-07-09T015:00:00-05:00'
    ),
    (object)array(
        'title' => 'Event 2',
        'start' => '2013-07-08',
        'end' => '2013-07-15'
    ),
    (object)array(
        'title' => 'Event 3',
        'start' => '2013-07-09T013:00:00-05:00',
        'end' => '2013-07-09T017:00:00-05:00'
    )
);

echo json_encode($events);