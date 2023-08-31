<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('inc/core.php');
$core = new Core();
$db = $core->dbcon;
// $core->check_cors();
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $email = $data->email;
    $password = $data->password;
    $password = hash("sha256", $password);
    $condition = "(u.EmailId='$email' OR u.MobileNumber='$email') AND u.Password='$password'";

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
    $response = $db->join('users', 'u', "u.*,urm.RoleId", $join_array, $condition);
    $total = $db->join_count('users', 'u', "u.UserId", $join_array, $condition);
    if (!empty($response)) {
        $response['Password'] = '';
    }
    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'Successfully logged In'
        ];
        $request->data = $response;
    } else {
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
