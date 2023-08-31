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


    $from = $data->from ?? '';
    $to = $data->to ?? '';
    $limit = $data->limit ?? '';





    $keyword = $data->keyword ?? '';
    $state = $data->state ?? '';




    $mystate = $data->mystate ?? '';
 $myschool = $data->myschool ?? '';


    
    // $user_id = $data->user_id;
    $condition = "isActive='Yes'";

    $schools_condition = "isActive='Yes'";
    
    $pagination = "$from,$to";
    

     $condition .= $keyword ? " AND (FullName LIKE '%" . $keyword . "%' OR  Email LIKE '%" . $keyword . "%' OR  Mobile LIKE '%" . $keyword . "%')" : "";
    $condition .= $state ? " AND (Status='$state')" : "";


    $condition .= $mystate ? " AND (State='$mystate')" : "";
    $condition .= $myschool ? " AND (School='$myschool')" : "";



 
    $response = $db->get_all('students', "*",$condition,"",$pagination);
    $total = $db->count('students', "ID",$condition);

    $schools = $db->get_all('schools', "*",$schools_condition);
    $total_schools = $db->count('schools', "ID",$schools_condition);


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
    $request->Schools = $schools;
    $request->totalSchools = $total_schools;
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);



