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
    $level = $data->level ?? '';
    $student = $data->student ?? '';
    $condition = "CourseLevelID=$level";



    $response = $db->get_all('course_modules', "*", $condition);
    $total = $db->count('course_modules', "ID", $condition);

    foreach ($response as $key => $module) {
        $quiz_status = $db->get('module_quiz_status', "*", "StudentID=$student AND CourseID=" . $module['ID']);
        if (!empty($quiz_status)) {
            $quiz_percentage = ($quiz_status['CorrectAnswers'] / ($quiz_status['CorrectAnswers'] + $quiz_status['WrongAnswers'])) * 100;
            $response[$key]['quizPercentage'] = $quiz_percentage;
            $response[$key]['quizStatus'] = "Completed";
        } else {
            $response[$key]['quizStatus'] = "Not Attempted";
        }
    }
    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'successfull'
        ];
        $request->data = $response;
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'No Courses Available'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No level posted'
    ];
}
echo json_encode($request);
