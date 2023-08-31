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
    $course_id = $data->course_id;
    $question = $data->question;
    $optiona = $data->optiona;
    $optionb = $data->optionb;
    $optionc = $data->optionc;
    $optiond = $data->optiond;
    $answer = $data->answer;
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
        $location_id = $db->add('certificate', $location_data);

        if ($location_id > 0) {
            $request->meta = [
                "error" => false,
                "message" => 'Asset Type successfully Added'
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
