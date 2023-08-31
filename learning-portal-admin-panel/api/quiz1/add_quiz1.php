<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('../inc/core.php');
$core = new Core();
$db = $core->dbcon;
// $core->check_cors();
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $course_id = $db->real_escape_string($data->course_id);
    $question = $db->real_escape_string($data->question);
    $optiona = $db->real_escape_string($data->optiona);
    $optionb = $db->real_escape_string($data->optionb);
    $optionc = $db->real_escape_string($data->optionc);
    $optiond = $db->real_escape_string($data->optiond);
    $answer = $db->real_escape_string($data->answer);
    // $title = $data->title;
    // $description = $data->description;
    // $state = $data->state;
    // $user_id = $data->user_id??1;

    if (!empty($question)) {
        $location_data = array(
            'CourseID' => $course_id,
            'Question' => $question,
            'OptionA' => $optiona,
            'OptionB' => $optionb,
            'OptionC' => $optionc,
            'OptionD' => $optiond,
            'Answer' => $answer,
            'CreatedAt' => $core->datetime
        );
        $location_id = $db->add('quiz1', $location_data);

        if ($location_id > 0) {
            $request->meta = [
                "error" => false,
                "message" => 'Question successfully Added'
            ];
            $request->id = $location_id;
        } else {
            $request = new \stdClass();
            $request->meta = [
                "error" => true,
                "message" => 'Something Error'
            ];
        }
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Fields are missing'
        ];
    }
}
 else {
    $request->meta = [
        "error" => true,
        "message" => 'Fields are missing'
    ];
}
echo json_encode($request);
