
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

    $course= $data->course??"";
    $title = $data->title??"";
    $question = $data->question??'';
    $typeofquestion = $data->typeofquestion??'';
    $answer = $data->answer??'';
    $status = $data->status??'';
   
    
          $user_data = array(
            'CourseID' => $course,
            'Qtitle' => $title,
            'Question' => $question,
            'TypeOfQuestion' => $typeofquestion,
            'Answer' => $answer,
            'Status' => $status,
        );
       
        

        $user_update = $db->update('excersize', $user_data,"ID=$id");

      



        if ($user_update===TRUE) {
            $request->meta = [
                "error" => false,
                "message" => 'User successfully updated'
            ];
            $request->id = $id;
        } else {
            $request = new \stdClass();
            $request->meta = [
                "error" => true,
                "message" => 'Something Error'
            ];
        }
  
}

echo json_encode($request);