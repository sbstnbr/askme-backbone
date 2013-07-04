<?php
header('Content-type: application/json');

$events = array(
    (object)array(
        'id' => 1,
        'title' => 'Event 1',
        'start' => '2013-07-09T08:00:00-05:00',
        'end' => '2013-07-09T15:00:00-05:00'
    ),
    (object)array(
        'id' => 2,
        'title' => 'Event 2',
        'start' => '2013-07-08',
        'end' => '2013-07-15'
    ),
    (object)array(
        'id' => 3,
        'title' => 'Event 3',
        'start' => '2013-07-09T13:00:00-05:00',
        'end' => '2013-07-09T17:00:00-05:00'
    )
);

echo json_encode($events);