
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


    $course_module = $_POST['course_module'];
    $course_title = $_POST['course_title'];
    $course_description = $_POST['course_description'];
    $status = $_POST['status'];
    // $course_module = $data->course_module;
    // $course_title = $data->course_title;
    // $course_description = $data->course_description;
    // $status = $data->status;
    // $user_id = $data->user_id??1;

    $photo_name = $_FILES['file']; 
    $photo_upload = $core->upload_file($photo_name, '../uploads/', array('png', 'jpg', 'jpeg'));
    if ($photo_upload['status'] == 'success') {
       $photo = $photo_upload['path'];
            } else {
                $photo = '';
            }






    if (!empty($course_title)) {
        $location_data = array(
            'CourseModuleID' => $course_module,
            'Title' => $course_title,
            'Slug' => $core->slugify($course_title),
            'Description' => $course_description,
            'Status' => $status,
            'CreatedAt' => $core->datetime,
            'Image' => $photo,
        );
        $location_id = $db->add('courses', $location_data);

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
