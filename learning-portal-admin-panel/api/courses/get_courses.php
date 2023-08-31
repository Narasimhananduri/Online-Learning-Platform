


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
    

    $from = $data->from ?? '';
    $to = $data->to ?? '';
    $limit = $data->limit ?? '';
    
    $pagination = "$from,$to";
    

    // $user_id = $data->edit_user_id;
    $condition = "c.isActive='Yes'";




    $join_array = array(
        array(
            "type" => 'LEFT JOIN',
            'table' => 'course_modules',
            'as' => 'm',
            "on" => 'm.ID=c.CourseModuleID'
        ),
        
        
      
    );



    $condition .= $keyword ? " AND (m.ModuleTitle LIKE '%" . $keyword . "%' OR  c.Title LIKE '%" . $keyword . "%')" : "";
    $condition .= $state ? " AND (c.Status='$state')" : "";


    $response = $db->join_all('courses', 'c', "c.*,m.ModuleTitle", $join_array, $condition,"",$pagination);
    $total = $db->join_count('courses', 'c', "c.ID", $join_array, $condition);


   
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


