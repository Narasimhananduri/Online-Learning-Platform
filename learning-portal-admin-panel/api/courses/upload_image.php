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
    $photo_name = $_FILES['image'];

    $photo_upload = $core->upload_file($photo_name, '../uploads/content/', array('png', 'jpg', 'jpeg'));
    if ($photo_upload['status'] == 'success') {
        $photo = $photo_upload['path'];
    } else {
        $photo = '';
    }

    if (!empty($photo)) {
        $request->success = 1;
        $request->file = ["url" => $core->base_url.$photo];
    } else {
        $request->success = 0;
        $request->file = ["url" => $core->base_url.$photo];
    }
} else {
    $request->success = 0;
        $request->file = ["url" => $core->base_url.$photo];
}
echo json_encode($request);
