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
    $condition = "ct.isActive='Yes'";

    $condition .= $mysearch ? " AND (ct.Title LIKE '%" . $mysearch . "%')" : "";
    $condition .= $state ? " AND (ct.Status='$state')" : "";
    $condition .= $coursefilter ? " AND (c.Title='$coursefilter')" : "";
    // $condition = "q.ID='$id'";

    $from = $data->from ?? '';
    $to = $data->to ?? '';
    $limit = $data->limit ?? '';
    
    $pagination = "$from,$to";



    $join_array = array(
        array(
            "type" => 'LEFT JOIN',
            'table' => 'courses',
            'as' => 'c',
            "on" => 'c.ID=ct.CourseID'
        ),
    );

    $response = $db->join_all('course_topics', 'ct', "ct.*,c.Title as 'CourseTitle'", $join_array, $condition,"",$pagination);
    $total = $db->join_count('course_topics', 'ct', "ct.ID", $join_array, $condition);

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
