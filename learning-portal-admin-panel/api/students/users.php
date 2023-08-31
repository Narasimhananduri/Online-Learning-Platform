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
    $user_id = $data->user_id;
    $keyword = $data->keyword ?? '';
    $role = $data->role ?? '';

    $condition = "isActive='yes'";
    $condition .= $keyword ? " AND (u.FirstName LIKE '%" . $keyword . "%' OR u.LastName LIKE '%" . $keyword . "%' OR u.MobileNumber LIKE '%" . $keyword . "%' OR u.EmailId LIKE '%" . $keyword . "%')" : "";
    $condition .= $role ? " AND (urm.RoleId = $role)" : "";
    // $condition .= $user_id ? "u.UserId='$user_id'" : '';

    $join_array = array(
        array(
            "type" => 'LEFT JOIN',
            'table' => 'user_role_mapping',
            'as' => 'urm',
            "on" => 'urm.UserId=u.UserId'
        ),
        array(
            "type" => 'LEFT JOIN',
            'table' => 'roles',
            'as' => 'r',
            "on" => 'r.RoleId=urm.RoleId'
        )
    );
    $response = $db->join_all('users', 'u', "u.*,r.RoleName", $join_array, $condition);
    $total = $db->join_count('users', 'u', "u.UserId", $join_array, $condition);

    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'data fetched successfully'
        ];
        $request->data = $response;
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
