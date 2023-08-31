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
    $level = $_POST['level'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $status = $_POST['status'];
    // $state = $data->state;
    // $user_id = $data->user_id??1;



    $photo_name = $_FILES['file'];
    $photo_upload = $core->upload_file($photo_name, '../uploads/', array('png', 'jpg', 'jpeg'));
    if ($photo_upload['status'] == 'success') {
       $photo = $photo_upload['path'];
            } else {
                $photo = '';
            }






    if (!empty($level)) {
        $location_data = array(
            'CourseLevelID' => $level,
            'ModuleTitle' => $title,
            'ModuleDescription' => $description,
            'Status' => $status,
            'CreatedAt' => $core->datetime,
            'Image' => $photo

        );
        $location_id = $db->add('course_modules', $location_data);

        if ($location_id > 0) {
            $request->meta = [
                "error" => false,
                "message" => 'Asset Type successfully Added'
            ];
            $request->id = $location_id;
        } else {
            $request = new \stdClass();
            $request->meta = [
                "error" => true,
                "message" => 'Something Error'
            ];
        }
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Fields are missing'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'Fields are missing'
    ];
}
echo json_encode($request);
