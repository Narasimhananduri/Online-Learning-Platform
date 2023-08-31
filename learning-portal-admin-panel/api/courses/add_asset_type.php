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
    $asset_name = $data->asset_name;
    $model_number = $data->model_number;
    $brand = $data->brand;
    $user_id = $data->user_id ?? 1;

    if (!empty($asset_name)) {
        $check_exist = $db->count('asset_types', "*", "AssetName='$asset_name' AND ModelNumber='$model_number' AND Brand='$brand'");
        if ($check_exist === 0) {
            // $update_no = $db->update('asset_status', array('isActive' => 'no'), "AssetId=$asset_id");
            $asset_type_data = array(
                'AssetName' => $asset_name,
                'ModelNumber' => $model_number,
                'Brand' => $brand,
                'CreatedOn' => $core->datetime
            );
            $asset_type_id = $db->add('asset_types', $asset_type_data);

            if ($asset_type_id > 0) {
                $request->meta = [
                    "error" => false,
                    "message" => 'Asset Type successfully Added'
                ];
                $request->id = $asset_type_id;
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
                "message" => 'Asset type already exist.'
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
