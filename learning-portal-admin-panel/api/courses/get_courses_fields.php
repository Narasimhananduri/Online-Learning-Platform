
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
    $condition = "c.ID='$id'";
    $join_array = array(
        array(
            "type" => 'LEFT JOIN',
            'table' => 'course_modules',
            'as' => 'm',
            "on" => 'm.ID=c.CourseModuleID'
        ),
    );
    // $response = $db->sql("SELECT * FROM `students`");
    $response = $db->join('courses',"c", "c.*,m.CourseLevelID as 'LevelID'", $join_array, $condition);
    $total =  $db->join_count('courses', 'c', "c.ID", $join_array, $condition);

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






















