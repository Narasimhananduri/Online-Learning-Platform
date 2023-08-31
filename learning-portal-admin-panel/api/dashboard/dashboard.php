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
    // $json = file_get_contents('php://input');
    // $data = json_decode($json);
    // $user_id = $data->user_id;
    $condition = "isActive='Yes'";
    $conditionactive = "Status='Active' AND isActive='Yes'";
    $conditiondisabled = "Status='Disabled' AND isActive='Yes'";

    $conditionmale = "Gender='Male' AND isActive='Yes'";
    $conditionfemale = "Gender='Female' AND isActive='Yes'";

    // $response = $db->sql("SELECT * FROM `students`");
    $total_students = $db->count('students', "ID", $condition);
    $total_courses = $db->count('courses', "ID", $condition);
    $total_astudents = $db->count('students', "ID", $conditionactive);
    $total_dstudents = $db->count('students', "ID", $conditiondisabled);
    $total_quizzes = $db->count('quiz', "DISTINCT CourseID", $condition);

    $total_male = $db->count('students', "ID", $conditionmale);
    $total_female = $db->count('students', "ID", $conditionfemale);

    $total_certificate = $db->count('certificate', "ID", $condition);


    $one_modules = $db->get_all('course_modules', "*", "CourseLevelID=1");
    foreach($one_modules as $key=>$module){
        $one_modules[$key]['Students'] = $db->count('module_quiz_status', "DISTINCT CourseID,StudentID", "CourseID='".$module['ID']."'");
    }

    $request->meta = [
        "error" => false,
        "message" => 'successfull'
    ];


    $request->total_students = $total_students;
    $request->total_courses = $total_courses;
    $request->total_astudents = $total_astudents;
    $request->total_dstudents = $total_dstudents;
    $request->total_quizzes = $total_quizzes;


    $request->total_male = $total_male;
    $request->total_female = $total_female;
    $request->total_certificate = $total_certificate;

    $request->one_modules = $one_modules;
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);
