
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

    $id = $data->id??'';
    $status = $data->status??'';
    $course = $data->course??'';
    $question = $data->question;
    $optiona = $data->optiona;
    $optionb = $data->optionb;
    $optionc = $data->optionc;
    $optiond = $data->optiond;
    $answer = $data->answer;
   
    
          $user_data = array(
            'CourseID' => $course,
            'Question' => $question,
            'OptionA' => $optiona,
            'OptionB' => $optionb,
            'OptionC' => $optionc,
            'OptionD' => $optiond,
            'Answer' => $answer,
            'Status' => $status,
        );
       


        $user_update = $db->update('quiz1', $user_data,"ID=$id");

      



        if ($user_update===TRUE) {
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