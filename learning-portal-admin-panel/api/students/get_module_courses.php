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

    //course response
    $c_response = $db->get_all('course_modules', "*", $condition);
    $total = $db->count('course_modules', "ID", $condition);

    foreach ($c_response as $key => $module) {
        $condition_two = "CourseModuleID='".$module['ID']."'";
        $courses = $db->get_all('courses', "*", $condition_two);
        $total_courses = $db->count('courses', "ID", $condition_two);

        if ($total_courses > 0) {
            foreach ($courses as $key_two => $value) {
                $total_topics = $db->count('course_topics', "ID", "CourseID=" . $value['ID']);
                $student_progress = $db->count('course_progress', "ID", "StudentID=$student AND CourseID=" . $value['ID']);
                $courses[$key_two]['total_topics'] = $total_topics;
                $courses[$key_two]['student_progress'] = $student_progress;
            }
        }
        $c_response[$key]['Courses'] = $courses;
    }


    // assessment response
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

        $condition = "CourseModuleID=" . $module['ID'];
        $courses_response = $db->get_all('courses', "*", $condition);
        $courses_total = $db->count('courses', "ID", $condition);
        if ($courses_total > 0) {
            foreach ($courses_response as $course_key => $course) {
                $quiz_status = $db->get('quiz_status', "*", "StudentID=$student AND CourseID=" . $course['ID']);
                if (!empty($quiz_status)) {
                    $quiz_percentage = ($quiz_status['CorrectAnswers'] / ($quiz_status['CorrectAnswers'] + $quiz_status['WrongAnswers'])) * 100;
                    $courses_response[$course_key]['quizPercentage'] = intval(!empty($quiz_percentage) ? $quiz_percentage : 0);
                    $courses_response[$course_key]['quizStatus'] = "Completed";
                } else {
                    $courses_response[$course_key]['quizStatus'] = "Not Attempted";
                }
            }
        }
        $response[$key]['Courses'] = $courses_response;
    }

    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'successfull'
        ];
        $request->data = $c_response;
        $request->assessmentData = $response;
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
