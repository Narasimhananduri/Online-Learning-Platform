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
    $title = $data->title;
    $question = $data->question;
    $type_of_question = $data->type_of_question;
    $answer = $data->answer;
    // $title = $data->title;
    // $description = $data->description;
    // $state = $data->state;
    // $user_id = $data->user_id??1;

    if (!empty($question)) {
        $location_data = array(
            'CourseID' => $course_id,
            'QTitle' => $title,
            'Question' => $question,
            'TypeOfQuestion' => $type_of_question,
            'Answer' => $answer,
            'CreatedAt' => $core->datetime
        );
        $location_id = $db->add('excersize', $location_data);

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
