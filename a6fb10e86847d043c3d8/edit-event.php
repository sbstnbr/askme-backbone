<?php
    header('Content-Type: text/html; charset=UTF-8');
    require_once '../api/mysql-connection.php';

    if (!empty($_POST['start'])
        && !empty($_POST['end'])
        && isset($_POST['allDay'])
        && !empty($_POST['subject'])
        && !empty($_POST['location'])
        && !empty($_POST['description'])
        && !empty($_POST['category'])
    ) {
        function _escape($conn, $value) {
            return mysqli_real_escape_string($conn, htmlspecialchars(trim($value)));
        }

        function add_https($str) {
            if (strlen($str) > 0 && strpos($str,'http') === false ) {
                $str = "http://" . $str;
            }

            return $str;
        }

        /*** SAVE ***/
        $start = _escape($conn, $_POST['start']);
        $end = _escape($conn, $_POST['end']);
        $allDay = (int)$_POST['allDay'];
        $subject = _escape($conn, $_POST['subject']);
        $location = _escape($conn, $_POST['location']);
        $description = _escape($conn, $_POST['description']);
        $category = _escape($conn, $_POST['category']);

        mysqli_autocommit($conn, false);

        $event_id = '';
        if (!empty($_GET['id']) && preg_match('/^\d+$/', $_GET['id'])) {
            $event_id = $_GET['id'];
            $query =
                "UPDATE event SET start = '{$start}', end = '{$end}', allDay = {$allDay}, subject = '{$subject}', "
                    . "location = '{$location}', description = '{$description}', category = '{$category}' "
                    . "WHERE id = {$event_id}";
        } else {
            $query =
                "INSERT INTO event(start, end, allDay, subject, location, description, category) "
                . "VALUES ('{$start}', '{$end}', {$allDay}, '{$subject}', '{$location}', '{$description}', '{$category}')";
        }

        if (!mysqli_query($conn, $query)) {
            echo 'Insert/update event failed<br />' . mysqli_error($conn);
            mysqli_rollback($conn);
            die;
        }

        $event_id = $event_id ?: mysqli_insert_id($conn);

        if (!empty($_POST['presenters'])) {

            // DELETE the presenters table entries referenced form current event
            $getPresenters = "DELETE presenters.*,event_presenter.* FROM `presenters` JOIN `event_presenter` on presenters.id = event_presenter.presenter_id WHERE event_presenter.event_id = " . $event_id;

            if (!mysqli_query($conn, $getPresenters)) {
                echo 'Delete event_presenter failed<br />' . mysqli_error($conn);
                echo "<br />Event id is: {$getPresenters}";
                mysqli_rollback($conn);
                die;
            }

            if (!mysqli_query($conn, "DELETE FROM event_presenter WHERE event_id = {$event_id}")) {
                echo 'Delete presenters failed<br />' . mysqli_error($conn);
                mysqli_rollback($conn);
                die;
            }

            // CREATE EVENT_PRESENTER table entry
            foreach($_POST['presenters'] as $idx => $presenter) {
                $presenter_description = _escape($conn, trim($_POST['descriptions'][$idx]));
                $link = _escape($conn, trim($_POST['links'][$idx]));
                $presenter = _escape($conn, trim($presenter));

                if (empty($presenter)) {
                    continue;
                }

                $link = add_https($link);

                // SAVE PRESENTER into presenters
                $create_presenter_query = "INSERT INTO presenters(name, description, link) VALUES ( '". $presenter ."', '". $presenter_description ."', '". $link ."' )";
                if(!mysqli_query($conn, $create_presenter_query) ) {
                    echo "Insert presenter failed<br />" . mysqli_error($conn);
                    mysqli_rollback($conn);
                    die;
                }

                //CREATE event_presenter entry
                $last_presenter_id = mysqli_insert_id($conn);
                echo "<br /> mysql_insert_id: " . $last_presenter_id . " ...";
                $create_event_presenter_query = "INSERT INTO event_presenter(event_id, presenter_id) VALUES ( '". $event_id ."', '". $last_presenter_id . "' )";
                if(!mysqli_query($conn, $create_event_presenter_query)) {
                    echo "Insert event_presenter failed <br />" . mysqli_error($conn);
                    mysqli_rollback($conn);
                    die;
                }
            }
        }
        mysqli_commit($conn);

        header('Location: events-list.php');
        die;
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
        'description' => '',
        'category' => ''
    );

    if (!empty($_REQUEST['id']) && $result = mysqli_query($conn, $query)) {
        $events = array();

        while ($row = mysqli_fetch_array($result)) {
            $event->id = $row['id'];
            $event->start = $row['start'];
            $event->allDay = (bool)$row['allDay'];
            $event->title = $row['subject'];
            $event->category = $row['category'];

            if (!empty($row['end'])) {
                $event->end = $row['end'];
            }

            if (!empty($row['location'])) {
                $event->location = $row['location'];
            }

            if (!empty($row['description'])) {
                $event->description = $row['description'];
            }

            $query = "SELECT presenters.* FROM `presenters` JOIN `event_presenter` on presenters.id = event_presenter.presenter_id WHERE event_presenter.event_id = {$event->id}";
            if ($resultPresenter = mysqli_query($conn, $query)) {
                while ($rowPresenter = mysqli_fetch_array($resultPresenter)) {
                    $event->presenters[] = (object)array(
                        'name' => $rowPresenter['name'],
                        'description' => $rowPresenter['description'],
                        'link' => $rowPresenter['link']
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

        select {
            width: auto;
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
                <sup>Provide date in ISO-8601 format: 2015-04-01T13:00:00</sup>
            </dd>
            <dt><label for="addEvent-endDate">End Date</label></dt>
            <dd>
                <input required type="text" id="addEvent-endDate" name="end" value="<?php echo $event->end; ?>" />
                <sup>Provide end date in ISO-8601 format: 2015-04-01T14:00:00</sup>
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
            <dt><label required for="addEvent-category">Category</label></dt>
            <dd><select id="addEvent-category" name="category">
                <option value=""></option>
                <option value="plenary" <?php if ($event->category === 'plenary') echo 'selected'; ?>>Plenary</option>
                <option value="deepdive" <?php if ($event->category === 'deepdive') echo 'selected'; ?>>Deep Dive</option>
                <option value="breakoutliquid" <?php if ($event->category === 'breakoutliquid') echo 'selected'; ?>>Breakout Liquid</option>
                <option value="intelligentbreakout" <?php if ($event->category === 'intelligentbreakout') echo 'selected'; ?>>Intelligent Breakout</option>
                <option value="connectedbreakout" <?php if ($event->category === 'connectedbreakout') echo 'selected'; ?>>Connected Breakout</option>
                <option value="breakoutother" <?php if ($event->category === 'breakoutother') echo 'selected'; ?>>Breakout-Other</option>
            </select></dd>
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
                <dd>Name: <input type="text" name="presenters[]" value="<?php echo !empty($presenter->name) ? $presenter->name : ''; ?>" /></dd>
                <dd>Bio: <textarea type="text" name="descriptions[]" /><?php echo !empty($presenter->description) ? $presenter->description : ''; ?></textarea></dd>
                <dd>Link: <input type="text" name="links[]" value="<?php echo !empty($presenter->link) ? $presenter->link : ''; ?>" />
                <sup>In form: http://your.link.com</sup></dd>
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