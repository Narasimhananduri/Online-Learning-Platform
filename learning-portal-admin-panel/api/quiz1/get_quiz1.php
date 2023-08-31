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
    // $id = $data->id ?? '';
    $mysearch = $data->mysearch ?? '';
    $state = $data->state ?? '';
    $coursefilter = $data->coursefilter ?? '';
    $condition = "q.isActive='Yes'";

    $from = $data->from ?? '';
    $to = $data->to ?? '';
    $limit = $data->limit ?? '';

    $pagination = "$from,$to";



    $condition .= $mysearch ? " AND (q.Question LIKE '%" . $mysearch . "%')" : "";
    $condition .= $state ? " AND (q.Status='$state')" : "";
    $condition .= $coursefilter ? " AND (c.Title='$coursefilter')" : "";
    // $condition = "q.ID='$id'";


    $join_array = array(
        array(
            "type" => 'LEFT JOIN',
            'table' => 'course_modules',
            'as' => 'c',
            "on" => 'c.ID=q.CourseID'
        ),
    );


  

//here courses is table were we want all fields and course_modules table we want only one field module title we combine two tables by  "on" => // 'm.ID=c.CourseModuleID' as ID of course_module is equal to the CourseModuleID of course table

 
    $response = $db->join_all('quiz1', 'q', "q.*,c.Title", $join_array, $condition,"",$pagination);
    $total = $db->join_count('quiz1', 'q', "q.ID", $join_array, $condition);

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
