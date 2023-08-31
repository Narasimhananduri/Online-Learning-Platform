
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
    $full_name = $data->full_name;
    $gender= $data->gender;
    $email= $data->email;
    $mobile = $data->mobile;
    $country = $data->country;
    $state = $data->state;
    $district = $data->district;
    $city = $data->city;
    $area = $data->area;
    $address = $data->address;
    $school = $data->school;
    $class1 = $data->class1;
    // $state = $data->state;
    // $user_id = $data->user_id??1;

    if (!empty($full_name)) {
        $location_data = array(
            'FullName' =>  $full_name ,
            'Gender' => $gender,
            'Email' => $email,
            'Mobile' => $mobile,
            'Country' => $country,
            'State' => $state,
            'District' => $district,
            'City' => $city,
            'Area' => $area ,
            'Address' => $address,
            'School' => $school,
            'Class' => $class1,
           
        );
        $location_id = $db->add('students', $location_data);

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
