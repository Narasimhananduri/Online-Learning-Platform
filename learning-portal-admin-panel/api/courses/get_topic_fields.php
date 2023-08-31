
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
    $id = $data->id;
    $condition = "t.ID='$id'";
    $join_array = array(
        array(
            "type" => 'LEFT JOIN',
            'table' => 'courses',
            'as' => 'c',
            "on" => 'c.ID=t.CourseID'
        ),
        array(
            "type" => 'LEFT JOIN',
            'table' => 'course_modules',
            'as' => 'm',
            "on" => 'm.ID=c.CourseModuleID'
        ),
    );
    
    $response = $db->join('course_topics',"t", "t.*,m.ID as 'ModuleID',m.CourseLevelID as 'LevelID'", $join_array, $condition);
    $total =  $db->join_count('course_topics', 't', "t.ID", $join_array, $condition);

    $modules = $db->get_all('course_modules', "*","CourseLevelID=".$response['LevelID']);
    $courses = $db->get_all('courses', "*","CourseModuleID=".$response['ModuleID']);

    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'successfull'
        ];
        $request->data = $response;
        $request->courses = $courses;
        $request->modules = $modules;
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Wrong Username or password'
        ];
    }
} else { 
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);






















