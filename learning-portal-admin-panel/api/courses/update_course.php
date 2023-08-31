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





    $course_id = $_POST['course_id'];
    $course_module = $_POST['course_module'];
    $course_title = $_POST['course_title'];
    $course_description = $_POST['course_description'];
    $status = $_POST['status'];







    // $class1 = $data->class1??'';


    $user_data = array(
        'CourseModuleID' => $course_module,
        'Title' => $course_title,
        'Slug' => $core->slugify($course_title),
        'Description' => $course_description,
        'Status' => $status,

    );


    if (isset($_FILES['file'])) {
        $photo_name = $_FILES['file'];
        $photo_upload = $core->upload_file($photo_name, '../uploads/', array('png', 'jpg', 'jpeg'));
        if ($photo_upload['status'] == 'success') {
            $photo = $photo_upload['path'];
        } else {
            $photo = '';
        }
        $user_data['Image'] = $photo;
    }

    $user_update = $db->update('courses', $user_data, "ID=$course_id");





    if ($user_update === TRUE) {
        $request->meta = [
            "error" => false,
            "message" => 'User successfully updated'
        ];
        // $request->id = $edit_user_id;
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Something Error'
        ];
    }
}

echo json_encode($request);
