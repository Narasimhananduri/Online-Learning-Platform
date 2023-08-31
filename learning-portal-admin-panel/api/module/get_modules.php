
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



    $keyword = $data->keyword ?? '';
    $state = $data->state ?? '';
    // $user_id = $data->edit_user_id;
    $condition = "c.isActive='Yes'";

    $from = $data->from ?? '';
    $to = $data->to ?? '';
    $limit = $data->limit ?? '';
    
    $pagination = "$from,$to";
    


    $join_array = array(
        array(
            "type" => 'LEFT JOIN',
            'table' => 'course_levels',
            'as' => 'l',
            "on" => 'l.ID=c.CourseLevelID'
        ),



    );



    $condition .= $keyword ? " AND (l.Title LIKE '%" . $keyword . "%' OR  c.ModuleTitle LIKE '%" . $keyword . "%')" : "";
    $condition .= $state ? " AND (c.Status='$state')" : "";
    //here courses is table were we want all fields and course_modules table we want only one field module title we combine two tables by  "on" => // 'm.ID=c.CourseModuleID' as ID of course_module is equal to the CourseModuleID of course table


    $response = $db->join_all('course_modules', 'c', "c.*,l.Title", $join_array, $condition,"",$pagination);
    $total = $db->join_count('course_modules', 'c', "c.ID", $join_array, $condition);



    // $response = $db->sql("SELECT * FROM `students`");
    // $response = $db->get('students', "*", $condition);
    // $total = $db->count('students', "ID");

    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'successfull'
        ];
        $request->data = $response;
        $request->total = $total;
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
