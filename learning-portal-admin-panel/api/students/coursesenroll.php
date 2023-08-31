

<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
// header('Content-Type: application/json');
// require('../inc/core.php');
// $core = new Core();
// $db = $core->dbcon;
// // $core->check_cors();
// $request = new \stdClass();
// if (isset($_POST)) {
//     $json = file_get_contents('php://input');
//     $data = json_decode($json);
//     $id = $data->id;
//     $condition = "c.StudentID=$id ";




//     $join_array = array(
//         array(
//             "type" => 'LEFT JOIN',
//             'table' => 'courses',
//             'as' => 'co',
//             "on" => 'co.ID=c.CourseID'
//         ),



//     );




//     //here courses is table were we want all fields and course_modules table we want only one field module title we combine two tables by  "on" => // 'm.ID=c.CourseModuleID' as ID of course_module is equal to the CourseModuleID of course table


//     $response = $db->join_all('course_progress', 'c', "c.*,co.Title,co.Description,co.Image", $join_array, $condition);
//     $total = $db->join_count('course_progress', 'c', "c.ID", $join_array, $condition);



//     // $response = $db->sql("SELECT * FROM `students`");
//     // $response = $db->get('students', "*", $condition);
//     // $total = $db->count('students', "ID");

//     if ($total > 0) {
//         $request->meta = [
//             "error" => false,
//             "message" => 'successfull'
//         ];
//         $request->data = $response;
//     } else {
//         $request = new \stdClass();
//         $request->meta = [
//             "error" => true,
//             "message" => 'Wrong Username or password'
//         ];
//     }
// } else {
//     $request->meta = [
//         "error" => true,
//         "message" => 'No credentials posted'
//     ];
// }
// echo json_encode($request);




