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
    
    // $user_id = $data->user_id;
    $condition = "isActive='Yes'";


    

    
    $from = $data->from ?? '';
    $to = $data->to ?? '';
    $limit = $data->limit ?? '';
    
    $pagination = "$from,$to";
    

    

     $condition .= $keyword ? " AND (FullName LIKE '%" . $keyword . "%' OR  Email LIKE '%" . $keyword . "%' OR  Mobile LIKE '%" . $keyword . "%')" : "";
    $condition .= $state ? " AND (Status='$state')" : "";
    // $condition="Status='$state'";
    // $response = $db->sql("SELECT * FROM `students`");
    $response = $db->get_all('trainer', "*",$condition,"",$pagination);
    $total = $db->count('trainer', "ID",$condition);

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



