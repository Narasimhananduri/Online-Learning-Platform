
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
    // $user_id = $data->user_id;
    $condition = "isActive='Yes'";

  $mysearch = $data->mysearch ?? '';
    $state = $data->state ?? '';
    $coursefilter = $data->coursefilter ?? '';

    $from = $data->from ?? '';
    $to = $data->to ?? '';
    $limit = $data->limit ?? '';
    
    $pagination = "$from,$to";
    

    $condition .= $mysearch ? " AND (Question LIKE '%" . $mysearch . "%')" : "";
    $condition .= $state ? " AND (Status='$state')" : "";
    $condition .= $coursefilter ? " AND (CourseID='$coursefilter')" : "";



   
    // $response = $db->sql("SELECT * FROM `students`");
    $response = $db->get_all('certificate', "*",$condition,"",$pagination);
    $total = $db->count('certificate', "ID",$condition);

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



