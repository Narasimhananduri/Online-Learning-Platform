
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


    $condition = "isActive='Yes'";

    $from = $data->from ?? '';
    $to = $data->to ?? '';
    $limit = $data->limit ?? '';

    $pagination = "$from,$to";






    $join_array = array(
        array(
            "type" => 'LEFT JOIN',
            'table' => 'course_topics',
            'as' => 't',
            "on" => 't.ID=f.TopicId'
        ),
    );

    $response = $db->get_all('feedback', "DISTINCT TopicId,(SELECT Title FROM course_topics as ct WHERE ct.ID=TopicId) as Title", "", "", $pagination, "");
    if (!empty($response)) {
        foreach ($response as $key => $value) {
            $yes_count =  $db->count('feedback', "*", "TopicId='" . $value['TopicId'] . "' AND Feedback='yes'");
            $no_count =  $db->count('feedback', "*", "TopicId='" . $value['TopicId'] . "' AND Feedback!='yes'");
            $response[$key]['Yes'] = $yes_count;
            $response[$key]['No'] = $no_count;
        }
    }
    $total = $db->count('feedback', "DISTINCT TopicId");
    // $total = $db->count('feedback', "f.ID", $join_array);
    // $response = $db->sql("SELECT * FROM `students`");
    // $response = $db->get('students', "*", $condition);
    // $total = $db->count('students', "ID");

    // if ($total) {
    $request->meta = [
        "error" => false,
        "message" => 'successfull'
    ];
    $request->data = $response;
    $request->total = $total;
    // } else {
    //     $request = new \stdClass();
    //     $request->meta = [
    //         "error" => true,
    //         "message" => 'Wrong Username or password'
    //     ];
    // }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);
