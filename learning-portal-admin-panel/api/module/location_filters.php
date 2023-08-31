<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('../inc/core.php');
$core = new Core();
$db = $core->dbcon;
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $user_id = $data->user_id ?? '';
    $condition = '';
    $states = $db->get_all('locations', 'DISTINCT State', $condition, "State DESC");
    if ($states) {
        $request->meta = [
            "error" => false,
            "message" => 'Successfully fetched',
        ];
        $request->states = $states;
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Data fetching Error'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No inputs posted'
    ];
}
echo json_encode($request);
