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

    $edit_user_id = $data->edit_user_id??'';

    $school = $data->school??"";
  

 
    $state = $data->state??'';
    $district = $data->district??'';
    $city = $data->city??'';
    $area= $data->area??'';
   



    $coordinator = $data->coordinator??'';
   
    $status = $data->status??'';
   
    
          $user_data = array(
            'SchoolName' => $school,
      

            'State' => $state,
            'District' =>$district,
            'City' => $city,
            'Area' => $area,
            






            'Coordinator' => $coordinator,
            
            'Status' => $status,
        );
       


        $user_update = $db->update('schools', $user_data,"ID=$edit_user_id");

      



        if ($user_update===TRUE) {
            $request->meta = [
                "error" => false,
                "message" => 'User successfully updated'
            ];
            $request->id = $edit_user_id;
        } else {
            $request = new \stdClass();
            $request->meta = [
                "error" => true,
                "message" => 'Something Error'
            ];
        }
  
}

echo json_encode($request);
