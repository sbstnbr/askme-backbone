<?php
    header('Content-Type: text/html; charset=UTF-8');
    require_once '../api/mysql-connection.php';

    if (!empty($_POST['start'])
        && !empty($_POST['end'])
        && isset($_POST['allDay'])
        && !empty($_POST['subject'])
        && !empty($_POST['location'])
        && !empty($_POST['description'])
    ) {
        function _escape($conn, $value) {
            return mysqli_real_escape_string($conn, htmlspecialchars(trim($value)));
        }

        /*** SAVE ***/
        $start = _escape($conn, $_POST['start']);
        $end = _escape($conn, $_POST['end']);
        $allDay = (int)$_POST['allDay'];
        $subject = _escape($conn, $_POST['subject']);
        $location = _escape($conn, $_POST['location']);
        $description = _escape($conn, $_POST['description']);

        mysqli_autocommit($conn, false);

        $query =
            "INSERT INTO event(start, end, allDay, subject, location, description) "
            . "VALUES ('{$start}', '{$end}', {$allDay}, '{$subject}', '{$location}', '{$description}')";

        if (!mysqli_query($conn, $query)) {
            echo 'Insert event failed<br />' . mysqli_error($conn);
            mysqli_rollback($conn);
            die;
        }

        $event_id = mysqli_insert_id($conn);

        if (!empty($_POST['presenters'])) {
            $presenters = array();
            foreach($_POST['presenters'] as $presenter) {
                $presenter = trim($presenter);
                if (!empty($presenter)) {
                    $presenters[] = _escape($conn, $presenter);
                }
            }

            $query =
                "INSERT INTO presenter(event_id, name) "
                . "VALUES({$event_id}, '"
                . implode("'), ({$event_id}, '", $presenters)
                . "')";

            if (!mysqli_query($conn, $query)) {
                echo 'Insert presenter failed<br />' . mysqli_error($conn);
                mysqli_rollback($conn);
                die;
            }
            
        }
        mysqli_commit($conn);
    } 

    /*** ADD / EDIT ***/
    $query = '';
    if (!empty($_REQUEST['id']) && preg_match('/^\d+$/', $_REQUEST['id'])) {
        $query = 'SELECT * FROM event WHERE id = ' . $_REQUEST['id'] . ' ORDER BY start';
    }

    $event = (object)array(
        'id' => '',
        'start' => '',
        'end' => '',
        'location' => '',
        'allDay' => false,
        'title' => '',
        'presenters' => array(),
        'description' => ''
    );

    if (!empty($_REQUEST['id']) && $result = mysqli_query($conn, $query)) {
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

            $query = "SELECT * "
               . "FROM presenter "
               . "WHERE event_id = {$event->id}";
            if ($resultPresenter = mysqli_query($conn, $query)) {
                while ($rowPresenter = mysqli_fetch_array($resultPresenter)) {
                    $event->presenters[] = (object)array(
                        'name' => $rowPresenter['name']
                    );
                }
            }
        }
    }

    mysqli_close($conn);
?>
<!DOCTYPE html>
<head>
    <link rel="stylesheet" href="../css/fonts.css" />
    <link rel="stylesheet" href="../css/foundation.css" />
    <style>
        body {
            padding: 3em 5ex;
        }

        input[type=text] {
            width: 50ex;
        }

        label {
            display: inline;
            margin-right: 3ex;
        }

        textarea {
            height: 6em;
            width: 75ex;
        }
    </style>
</head>
<body>
    <header>
        <h1><?php echo $query ? 'Edit' : 'Add'; ?> Event</h1>
    </header>
    <form id="editEvent" class="eventInfo" method="POST">
        <dl>
            <dt><label for="addEvent-title">Title</label></dt>
            <dd><input required type="text" id="addEvent-title" name="subject" value="<?php echo $event->title; ?>" /></dd>
            <dt><label for="addEvent-startDate">Start Date</label></dt>
            <dd>
                <input required type="text" id="addEvent-startDate" name="start" value="<?php echo $event->start; ?>" />
                <sup>Provide date in ISO-8601 format: 2013-07-22T13:00:00</sup>
            </dd>
            <dt><label for="addEvent-endDate">End Date</label></dt>
            <dd>
                <input required type="text" id="addEvent-endDate" name="end" value="<?php echo $event->end; ?>" />
                <sup>Provide end date in ISO-8601 format: 2013-07-22T13:00:00</sup>
            </dd>
            <dt><label>All day?</label></dt>
            <dd>
                <input type="radio" id="addEvent-allDay-yes" name="allDay" value="1" <?php if ($event->allDay) echo "checked"; ?> />
                <label class="radio" for="addEvent-allDay-yes">Yes</label>
                <input type="radio" id="addEvent-allDay-no" name="allDay" value="0" <?php if (!$event->allDay) echo "checked"; ?> />
                <label class="radio" for="addEvent-allDay-no">No</label>
            </dd>
            <dt><label required for="addEvent-location">Location</label></dt>
            <dd><input type="text" id="addEvent-location" name="location" value="<?php echo $event->location; ?>" /></dd>
            <dt><label required for="addEvent-description">Abstract</label></dt>
            <dd><textarea id="addEvent-description" name="description"><?php echo $event->description; ?></textarea></dd>
        </dl>

        <div class="presenters">
        <?php
            $max = 5;
            $i = 0;
            while($i++ < $max) {
                $presenter = array_shift($event->presenters);
        ?>
            <dl>
                <dt><label>Presenter <?php echo $i; ?></label></dt>
                <dd><input type="text" name="presenters[]" value="<?php echo !empty($presenter->name) ? $presenter->name : ''; ?>" /></dd>
            </dl>
        <?php
            }
        ?>
        </div>
        <div class="clearfix">
            <button class="save" type="submit">Save</button>
        </div>
    </form>
</body>