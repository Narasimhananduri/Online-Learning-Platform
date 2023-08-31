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
    $id = $data->id ?? '';
    $user_id = $data->user_id ?? '';
    $keyword = $data->keyword ?? '';
    $state = $data->state ?? '';

    $pagination = "$from,$to";

    $condition = "isActive='yes'";
    $condition .= $keyword ? " AND (LocationName LIKE '%" . $keyword . "%' OR Address LIKE '%" . $keyword . "%' OR District LIKE '%" . $keyword . "%')" : "";
    $condition .= $state ? " AND (State = $state)" : "";

    $response = $db->get_all('locations', "*", $condition, "LocationId DESC", $pagination);
    $total = $db->count('locations', "*", $condition);

    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'Successfully fetched',
            "total" => $total,
        ];
        $request->data = $response;
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'No Records found'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No inputs posted'
    ];
}
echo json_encode($request);
